import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { RestInterceptor } from './interceptor/http.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import expressBasicAuth from 'express-basic-auth';
import { SWAGGER_AUTH_OPTIONS, SWAGGER_PATH } from './constant/swagger.constant';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.use(helmet());
	app.use(cookieParser());
	app.useGlobalInterceptors(new RestInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());

	app.use([SWAGGER_PATH], expressBasicAuth(SWAGGER_AUTH_OPTIONS));

	setupSwagger(app);

	await app.listen(8080);
}

bootstrap();
