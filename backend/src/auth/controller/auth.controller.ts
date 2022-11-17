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
	tokenCookieOptions,
} from '@constant';
import { JwtAuthGuard } from '../guard/jwt.guard';

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
		const accessToken = this.authService.createJwt({
			payload: { nickname: 'user.nickname', email: 'user.email' },
			secret: JWT_ACCESS_TOKEN_SECRET,
			expirationTime: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
		});
		const refreshToken = this.authService.createJwt({
			payload: { nickname: 'user.nickname', email: 'user.email' },
			secret: JWT_REFRESH_TOKEN_SECRET,
			expirationTime: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
		});

		res.cookie(ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(REFRESH_TOKEN, refreshToken, tokenCookieOptions);
	}

	@UseGuards(JwtAuthGuard)
	@Get('login')
	@HttpCode(OK)
	loginValidate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = req.cookies;
		res.cookie(ACCESS_TOKEN, accessToken, tokenCookieOptions).cookie(
			REFRESH_TOKEN,
			refreshToken,
			tokenCookieOptions
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(ACCESS_TOKEN);
		res.clearCookie(REFRESH_TOKEN);
	}
}
