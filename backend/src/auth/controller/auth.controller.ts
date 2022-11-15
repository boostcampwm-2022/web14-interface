import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('oauth/redirect/:type')
	@Redirect('/', 301)
	redirectOauthPage(@Param('type') type: string) {
		return this.authService.getSocialUrl(type);
	}

	@Get('oauth/callback/:type')
	async socialJoin(
		@Query('authorization_code') authorizationCode: string,
		@Param('type') type: string
	) {}
}
