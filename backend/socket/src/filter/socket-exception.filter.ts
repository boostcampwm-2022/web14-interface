import { EVENT } from '@constant';
import {
	Catch,
	ArgumentsHost,
	InternalServerErrorException,
	Logger,
	HttpException,
} from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class SocketExceptionFilter extends BaseWsExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const logger = new Logger('SocketException');

		const ctx = host.switchToWs();
		const client = ctx.getClient<Socket>();

		const { name, stack } = exception;
		let { message } = exception;
		if (!(exception instanceof WsException)) {
			const res: any = (exception as HttpException)?.getResponse();
			message = res.message;
		}

		logger.error(`[Client ID] ${client.id}] `);
		logger.error(`[Exception Name] ${name}`);
		logger.error(`[Exception Message] ${message}`);
		logger.error(`[Exception Stack] ${stack}`);

		const error = { message, stack: exception.stack };

		if (exception instanceof WsException) {
			client.emit(EVENT.BAD_REQUEST, error);
			return;
		}

		if (exception instanceof HttpException) {
			client.emit(EVENT.VALIDATION_EXCEPTION, error);
			return;
		}

		exception = new InternalServerErrorException();
		client.emit(EVENT.INTERNAL_SERVER_EXCEPTION, error);
	}
}
