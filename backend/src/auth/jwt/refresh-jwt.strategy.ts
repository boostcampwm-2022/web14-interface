import {
	JWT_ACCESS_TOKEN_EXPIRATION_TIME,
	JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_SECRET,
} from '@constant';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { Payload } from 'src/types/auth.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private readonly configService: ConfigService, // private readonly userRepository: UserRepository<UserEntity>
		private readonly authService: AuthService
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => {
					const token = req?.cookies.accessToken;
					return token ?? null;
				},
			]),
			secretOrKey: configService.get(JWT_REFRESH_TOKEN_SECRET),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: Payload) {
		const accessToken = this.authService.createJwt({
			payload: { nickname: payload.nickname, email: payload.email },
			secret: JWT_ACCESS_TOKEN_SECRET,
			expirationTime: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
		});

		req.cookies = { ...req.cookies, accessToken };

		return payload;
	}
}
