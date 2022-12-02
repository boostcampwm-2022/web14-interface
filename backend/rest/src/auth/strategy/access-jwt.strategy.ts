import { JWT_ENV } from '@constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/types/auth.type';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(private readonly configService: ConfigService) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					const token = req?.cookies.accessToken;
					return token ?? null;
				},
			]),
			secretOrKey: configService.get(JWT_ENV.JWT_ACCESS_TOKEN_SECRET),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: JwtPayload) {
		return payload;
	}
}
