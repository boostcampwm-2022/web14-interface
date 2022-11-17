import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@constant';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtConfig } from '@config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(
		private readonly configService: ConfigService, // private readonly userRepository: UserRepository<UserEntity>
		private jwtService: JwtService
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => {
					const token = req?.cookies.accessToken;
					if (!token) return null;
					return token;
				},
			]),
			secretOrKey: configService.get(JWT_ACCESS_TOKEN_SECRET),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: string) {
		console.log(req.cookies);

		const { accessToken } = req.cookies;

		if (!accessToken) throw new UnauthorizedException('no token');

		return payload;
	}
}
