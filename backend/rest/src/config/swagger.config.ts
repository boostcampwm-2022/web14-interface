import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
	.setTitle('인터페이스 API 문서')
	.setDescription('Web14 - interface 프로젝트에서 사용하는 API를 작성한 문서입니다.')
	.setVersion('0.0.1')
	.addTag('auth')
	.addTag('interview')
	.addCookieAuth('accessToken', {
		type: 'http',
		in: 'header',
		scheme: 'bearer',
	})
	.build();

export function setupSwagger(app: INestApplication) {
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('docs/api', app, document);
}
