import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	setupSwagger(app);
	await app.listen(8080);
}
bootstrap();
