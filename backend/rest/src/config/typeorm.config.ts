import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeormConfig =
	process.env.NODE_ENV === 'dev'
		? {
				useFactory: async (
					configService: ConfigService
				): Promise<TypeOrmModuleOptions> => ({
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
		  }
		: {
				useFactory: async (
					configService: ConfigService
				): Promise<TypeOrmModuleOptions> => ({
					type: 'mysql',
					host: 'localhost',
					port: 3306,
					username: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_NAME,
					entities: [__dirname + '/../**/*.entity.{ts,js}'],
					logging: [],
					synchronize: true,
				}),
				inject: [ConfigService],
		  };
