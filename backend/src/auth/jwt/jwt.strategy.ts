import { JWT_REFRESH_TOKEN_SECRET } from '@constant';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/typeorm-user.entity';
import { UserRepository } from 'src/user/repository/interface-user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService // private readonly userRepository: UserRepository<UserEntity>
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
			secretOrKey: configService.get(JWT_REFRESH_TOKEN_SECRET),
		});
	}

	async validate(payload: any) {
		// const user = await this.userRepository.findUserById(payload.id);
		console.log(payload);

		if (!payload) throw new UnauthorizedException();

		return payload;
	}
}
