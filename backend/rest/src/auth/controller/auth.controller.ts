import { Controller, Get, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { tokenCookieOptions, JWT_TYPE } from '@constant';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { JwtPayload } from '@types';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('oauth/redirect/:type')
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
		if (!authorizationCode) {
			res.redirect(process.env.CLIENT_ORIGIN_URL);
			return;
		}
		const user = await this.authService.socialStart({ type, authorizationCode });

		const { accessToken, refreshToken } =
			this.authService.createAccessTokenAndRefreshToken(user);

		res.cookie(JWT_TYPE.ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(JWT_TYPE.REFRESH_TOKEN, refreshToken, tokenCookieOptions);
		res.redirect(process.env.CLIENT_ORIGIN_URL);
	}

	@UseGuards(JwtAuthGuard)
	@Get('login')
	loginValidate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = req.cookies;
		res.cookie(JWT_TYPE.ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(JWT_TYPE.REFRESH_TOKEN, refreshToken, tokenCookieOptions);
	}

	@UseGuards(JwtAuthGuard)
	@Get('id')
	getUserId(@Req() req: Request) {
		const userPayload = req.user as JwtPayload;
		return userPayload.id;
	}

	@UseGuards(JwtAuthGuard)
	@Get('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(JWT_TYPE.ACCESS_TOKEN);
		res.clearCookie(JWT_TYPE.REFRESH_TOKEN);
	}
}
