import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class RestInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const logger = new Logger('REST API');
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<Request>();

		const start = new Date().getTime();
		return next
			.handle()
			.pipe(
				tap(() => {
					const end = new Date();
					logger.log(`[Request URL] ${req.url}`);
					logger.log(`[Process Time] ${end.getTime() - start}ms`);
				})
			)
			.pipe(map((result) => ({ data: result })));
	}
}
