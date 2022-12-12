import { ValidationPipeOptions } from '@nestjs/common';

export const pipeOptions: ValidationPipeOptions = {
	transform: true,
	forbidNonWhitelisted: true,
	forbidUnknownValues: true,
};
