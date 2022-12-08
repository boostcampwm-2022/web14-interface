import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './config/redis.adapter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();

	app.useWebSocketAdapter(redisIoAdapter);

	await app.listen(8081);
}

bootstrap();
