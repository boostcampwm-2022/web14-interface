import {
	Controller,
	Get,
	HttpCode,
	Param,
	Query,
	Redirect,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import {
	ACCESS_TOKEN,
	JWT_ACCESS_TOKEN_EXPIRATION_TIME,
	JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_EXPIRATION_TIME,
	JWT_REFRESH_TOKEN_SECRET,
	OK,
	REFRESH_TOKEN,
} from '@constant';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from '@config';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('oauth/redirect/:type')
	@Redirect('/', 301)
	redirectOauthPage(@Param('type') type: string) {
		return this.authService.getSocialUrl(type);
	}

	@Get('oauth/callback/:type')
	async socialStart(
		@Query('authorization_code') authorizationCode: string,
		@Param('type') type: string,
		@Res({ passthrough: true }) res: Response
	) {
		// const user = await this.authService.socialStart({ type, authorizationCode });
		const accessToken = this.authService.getJwt({
			payload: 'user.nickname',
			secret: JWT_ACCESS_TOKEN_SECRET,
			expirationTime: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
		});
		const refreshToken = this.authService.getJwt({
			payload: 'user.nickname',
			secret: JWT_REFRESH_TOKEN_SECRET,
			expirationTime: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
		});

		res.cookie(ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
		res.cookie(REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
	}

	@UseGuards(JwtAuthGuard)
	@Get('login')
	@HttpCode(OK)
	validate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = req.cookies;
		res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true }).cookie(
			REFRESH_TOKEN,
			refreshToken,
			{ httpOnly: true }
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get('logout')
	@Redirect('/')
	logout(@Res() res: Response) {
		res.clearCookie(ACCESS_TOKEN);
		res.clearCookie(REFRESH_TOKEN);
	}
}
