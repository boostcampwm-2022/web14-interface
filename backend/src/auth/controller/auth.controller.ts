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
import { JwtGuard } from '../guard/jwt.guard';
import { OK } from '@constant';

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
		const user = await this.authService.socialStart({ type, authorizationCode });
		const { accessToken, ...cookieOptions } =
			this.authService.getCookieWithJwtAccessToken(user);

		res.cookie('access-token', accessToken, cookieOptions);
	}

	@Get('login')
	@UseGuards(JwtGuard)
	@HttpCode(OK)
	validate() {}
}
