import { EVENT } from '@constant';
import { Catch, ArgumentsHost, InternalServerErrorException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class SocketExceptionFilter extends BaseWsExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const logger = new Logger('SocketException');

		const ctx = host.switchToWs();
		const client = ctx.getClient<Socket>();

		logger.error(`[Client ID] ${client.id}] `);
		logger.error(`[Error Message] ${exception.message}`);
		logger.error(`[Error Stack] ${exception.stack}`);

		if (exception instanceof WsException) {
			client.emit(EVENT.BAD_REQUEST, exception);
			return;
		}

		exception = new InternalServerErrorException();
		client.emit('INTERNAL_SERVER_EXCEPTION', exception);
	}
}
