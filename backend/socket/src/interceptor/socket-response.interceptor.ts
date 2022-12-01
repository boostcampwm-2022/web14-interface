import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';
import { Request } from 'express';

@Injectable()
export class SocketResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<Request>();
		console.log(req.ip);

		return next.handle().pipe(
			map((response) => {
				console.log(response);

				return new SocketResponseDto(response);
			})
		);
	}
}
