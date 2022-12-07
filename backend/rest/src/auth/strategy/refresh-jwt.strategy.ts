import { accessTokenOptions, JWT_ENV } from '@constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { JwtPayload } from 'src/types/auth.type';
import { JwtPayloadBuiler } from 'src/auth/dto/create-jwt.builder';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => {
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
		const createJwtPayload = new JwtPayloadBuiler().setId(id).setEmail(email).build();
		const accessToken = this.authService.createJwt({
			payload: createJwtPayload,
			...accessTokenOptions,
		});

		req.cookies.accessToken = accessToken;

		return payload;
	}
}
