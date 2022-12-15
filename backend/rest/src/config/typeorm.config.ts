import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeormConfig = {
	useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: configService.get('DB_USER'),
		password: configService.get('DB_PASSWORD'),
		database: configService.get('DB_NAME'),
		entities: [__dirname + '/../**/*.entity.{ts,js}'],
		logging: ['query', 'error'],
		synchronize: true,
		namingStrategy: new SnakeNamingStrategy(),
	}),
	inject: [ConfigService],
};
