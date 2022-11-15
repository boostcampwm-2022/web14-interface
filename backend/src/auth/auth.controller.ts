import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('test')
	join() {
		return this.authService.join();
	}
}
