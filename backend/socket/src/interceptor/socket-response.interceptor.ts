import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Socket } from 'socket.io';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';

@Injectable()
export class SocketResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const logger = new Logger('Socket request');

		const ctx = context.switchToWs();
		const client = ctx.getClient<Socket>();

		const start = Date.now();
		return next.handle().pipe(
			tap(() => {
				const end = Date.now();
				logger.log(`[Client ID: ${client.id}] [${end - start}ms]`);
			}),
			map((response) => {
				return new SocketResponseDto(response);
			})
		);
	}
}
