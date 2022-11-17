import { JWT_ACCESS_TOKEN_EXPIRATION_TIME, JWT_ACCESS_TOKEN_SECRET } from '@constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig = {
	import: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => ({
		signOptions: {
			expiresIn: `${configService.get(JWT_ACCESS_TOKEN_EXPIRATION_TIME)}s`,
		},
	}),
};
