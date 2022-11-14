import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.use(helmet);
	app.use(cookieParser());
	setupSwagger(app);

	await app.listen(8080);
}

bootstrap();
