import { Controller, Get, HttpStatus, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { tokenCookieOptions, JWT_TYPE } from '@constant';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { JwtPayload } from '@types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedirectUrlResponseDto } from '../dto/redirect-url.dto';
import { UserIdResponseDto } from '../dto/user-id.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'type별 oauth URL 가져오기' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'url 요청 성공',
		type: RedirectUrlResponseDto,
	})
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

	@ApiOperation({ summary: '로그인 및 로그인 여부 확인하기' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: '로그인 성공',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '로그인 실패',
	})
	@UseGuards(JwtAuthGuard)
	@Get('login')
	loginValidate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = req.cookies;
		res.cookie(JWT_TYPE.ACCESS_TOKEN, accessToken, tokenCookieOptions);
		res.cookie(JWT_TYPE.REFRESH_TOKEN, refreshToken, tokenCookieOptions);
	}

	@ApiOperation({ summary: '유저 id 가져오기' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'id 요청 성공',
		type: UserIdResponseDto,
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	})
	@UseGuards(JwtAuthGuard)
	@Get('id')
	getUserId(@Req() req: Request) {
		const userPayload = req.user as JwtPayload;

		const userIdResponseDto = new UserIdResponseDto(userPayload.id);

		return userIdResponseDto;
	}

	@ApiOperation({ summary: 'logout 하기' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: '로그아웃 성공',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '로그아웃 실패',
	})
	@UseGuards(JwtAuthGuard)
	@Get('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(JWT_TYPE.ACCESS_TOKEN);
		res.clearCookie(JWT_TYPE.REFRESH_TOKEN);
	}
}
