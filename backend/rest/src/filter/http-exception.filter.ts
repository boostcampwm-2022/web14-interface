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

		console.log(exception);
		
		if (!(exception instanceof HttpException)) {
			exception = new InternalServerErrorException();
		}

		const { statusCode, message, error }: any = (exception as HttpException).getResponse();
		const { stack } = exception;

		logger.error(`[Request URL] ${req.url}`);
		logger.error(`[Exception Time] ${new Date().toISOString()}`);
		logger.error(`[Exception Name] ${error}`);
		logger.error(`[Exception Message] ${statusCode} - ${message}`);
		logger.error(`[Exception Stack] ${stack}`);

		const response = {
			name: error,
			message: `${statusCode} - ${message}`,
			stack: stack,
		};

		res.status(statusCode).json(response);
	}
}
