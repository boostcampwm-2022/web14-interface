import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { RestInterceptor } from './interceptor/http.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { pipeOptions } from './config/pipe.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.use(helmet());
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe(pipeOptions));
	app.useGlobalInterceptors(new RestInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());

	setupSwagger(app);

	await app.listen(8080);
}

bootstrap();
