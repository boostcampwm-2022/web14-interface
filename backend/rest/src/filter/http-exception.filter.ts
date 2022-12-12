import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const logger = new Logger('EXCEPTION');

		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		const req = ctx.getRequest<Request>();

		if (!(exception instanceof HttpException)) {
			exception = new InternalServerErrorException();
		}

		const { name, status, message }: any = exception;

		logger.error(`[Request URL] ${req.url}`);
		logger.error(`[Exception Time] ${new Date().toISOString()}`);
		logger.error(`[Exception Name] ${name}`);
		logger.error(`[Exception Message] ${status} - ${message}`);
		logger.error(`[Exception Stack] ${exception.stack}`);

		const response = {
			name,
			message: `${status} - ${message}`,
			stack: exception.stack,
		};

		res.status(status).json(response);
	}
}
