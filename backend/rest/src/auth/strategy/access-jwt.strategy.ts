import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload, UserInfo } from 'src/types/auth.type';
import { AuthService } from '../service/auth.service';
import { JWT_ACCESS_TOKEN_SECRET } from 'src/constant/env.constant';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					const token = req?.cookies.accessToken;
					return token ?? null;
				},
			]),
			secretOrKey: configService.get(JWT_ACCESS_TOKEN_SECRET),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: JwtPayload) {
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
