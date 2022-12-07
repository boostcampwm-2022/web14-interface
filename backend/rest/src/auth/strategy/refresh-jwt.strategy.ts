import { JWT_ENV } from '@constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { JwtPayload, UserInfo } from 'src/types/auth.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					const token = req?.cookies.refreshToken;
					return token ?? null;
				},
			]),
			secretOrKey: configService.get(JWT_ENV.JWT_REFRESH_TOKEN_SECRET),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
		const { id, email } = payload;
		const { accessToken, refreshToken } = this.authService.createAccessTokenAndRefreshToken({
			id,
			email,
		} as UserInfo);

		req.cookies.accessToken = accessToken;
		req.cookies.refreshToken = refreshToken;

		return payload;
	}
}
