import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class RestInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const logger = new Logger('REST API');
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<Request>();

		logger.log(`[Request URL] ${req.method} ${req.url}`);

		const start = new Date().getTime();
		return next
			.handle()
			.pipe(
				tap(() => {
					const end = new Date();
					logger.log(`[Process Time] ${end.getTime() - start}ms`);
				})
			)
			.pipe(map((result) => ({ data: result })));
	}
}
