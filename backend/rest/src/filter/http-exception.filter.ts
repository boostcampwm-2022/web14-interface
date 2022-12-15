import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const logger = new Logger('EXCEPTION');

		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		const req = ctx.getRequest<Request>();

		if (!(exception instanceof HttpException || exception instanceof QueryFailedError)) {
			console.error(exception);
			exception = new InternalServerErrorException();
		}

		const { statusCode, message, name }: any = (exception as HttpException)?.getResponse();
		const { stack } = exception;

		logger.error(`[Request URL] ${req.url}`);
		logger.error(`[Exception Time] ${new Date().toISOString()}`);
		logger.error(`[Exception Name] ${name}`);
		logger.error(`[Exception Message] ${statusCode} - ${message}`);
		logger.error(`[Exception Stack] ${stack}`);
		if (exception instanceof QueryFailedError) {
			Logger.error(`[SQL MESSAGE] ${exception.message}`);
		}

		const response = {
			name,
			message: `${statusCode} - ${message}`,
			stack: stack,
		};

		res.status(statusCode).json(response);
	}
}
