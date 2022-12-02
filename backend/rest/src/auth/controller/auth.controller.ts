import { Controller, Get, HttpCode, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { HTTP_STATUS, tokenCookieOptions, JWT_TYPE } from '@constant';
import { JwtAuthGuard } from '../guard/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('oauth/redirect/:type')
	@HttpCode(HTTP_STATUS.HTTP_REDIRECT)
	redirectOauthPage(@Param('type') type: string) {
		const pageUrl = this.authService.getSocialUrl(type);
		return { url: pageUrl };
	}

	@Get('oauth/callback/:type')
	async socialStart(
		@Query('code') authorizationCode: string,
		@Param('type') type: string,
		@Res() res: Response
	) {
		const user = await this.authService.socialStart({ type, authorizationCode });
		const { accessToken, refreshToken } =
			this.authService.createAccessTokenAndRefreshToken(user);

		res.cookie(JWT_TYPE.ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(JWT_TYPE.REFRESH_TOKEN, refreshToken, tokenCookieOptions);
		res.redirect(process.env.CLIENT_ORIGIN_URL);
	}

	@UseGuards(JwtAuthGuard)
	@Get('login')
	@HttpCode(HTTP_STATUS.HTTP_OK)
	loginValidate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = req.cookies;
		res.cookie(JWT_TYPE.ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(JWT_TYPE.REFRESH_TOKEN, refreshToken, tokenCookieOptions);
		return { statusCode: 200 };
	}

	@UseGuards(JwtAuthGuard)
	@Get('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(JWT_TYPE.ACCESS_TOKEN);
		res.clearCookie(JWT_TYPE.REFRESH_TOKEN);
		return { statusCode: 200 };
	}
}
