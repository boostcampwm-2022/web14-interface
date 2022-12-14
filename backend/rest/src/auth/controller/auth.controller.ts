import { Controller, Get, HttpStatus, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import {
	tokenCookieOptions,
	JWT_TYPE,
	REDIRECT_URL_SWAGGER,
	LOGIN_SWAGGER,
	USERID_SWAGGER,
	LOGOUT_SWAGGER,
} from '@constant';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { JwtPayload } from '@types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedirectUrlResponseDto } from '../dto/redirect-url.dto';
import { UserIdResponseDto } from '../dto/user-id.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation(REDIRECT_URL_SWAGGER.SUMMARY)
	@ApiResponse(REDIRECT_URL_SWAGGER.SUCCESS)
	@Get('oauth/redirect/:type')
	redirectOauthPage(@Param('type') type: string) {
		const pageUrl = this.authService.getSocialUrl(type);

		const redirectUrlResponseDto = new RedirectUrlResponseDto(pageUrl);

		return redirectUrlResponseDto;
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

	@ApiOperation(LOGIN_SWAGGER.SUMMARY)
	@ApiResponse(LOGIN_SWAGGER.SUCCESS)
	@ApiResponse(LOGIN_SWAGGER.FAIL)
	@UseGuards(JwtAuthGuard)
	@Get('login')
	loginValidate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = req.cookies;
		res.cookie(JWT_TYPE.ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(JWT_TYPE.REFRESH_TOKEN, refreshToken, tokenCookieOptions);
	}

	@ApiOperation(USERID_SWAGGER.SUMMARY)
	@ApiResponse(USERID_SWAGGER.SUCCESS)
	@ApiResponse(USERID_SWAGGER.FAIL)
	@UseGuards(JwtAuthGuard)
	@Get('id')
	getUserId(@Req() req: Request) {
		const userPayload = req.user as JwtPayload;

		const userIdResponseDto = new UserIdResponseDto(userPayload.id);

		return userIdResponseDto;
	}

	@ApiOperation(LOGOUT_SWAGGER.SUMMARY)
	@ApiResponse(LOGOUT_SWAGGER.SUCCESS)
	@ApiResponse(LOGOUT_SWAGGER.FAIL)
	@UseGuards(JwtAuthGuard)
	@Get('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(JWT_TYPE.ACCESS_TOKEN);
		res.clearCookie(JWT_TYPE.REFRESH_TOKEN);
	}
}
