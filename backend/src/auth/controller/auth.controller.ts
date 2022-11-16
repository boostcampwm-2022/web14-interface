import { Controller, Get, HttpCode, Param, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('oauth/redirect/:type')
	@HttpCode(301)
	redirectOauthPage(@Param('type') type: string, @Res() res: Response) {
		const pageUrl = this.authService.getSocialUrl(type);
		res.redirect(pageUrl);
	}

	@Get('oauth/callback/:type')
	async socialStart(@Query('code') authorizationCode: string, @Param('type') type: string) {
		const userId = await this.authService.socialStart({ type, authorizationCode });
		return userId;
	}
}
