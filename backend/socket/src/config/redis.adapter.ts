import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { REDIS_URL } from '@constant';

export const pubClient = createClient({ url: process.env[REDIS_URL] });
const subClient = pubClient.duplicate();

export class RedisIoAdapter extends IoAdapter {
	private adapterConstructor: ReturnType<typeof createAdapter>;

	async connectToRedis(): Promise<void> {
		await Promise.all([pubClient.connect(), subClient.connect()]);
		this.adapterConstructor = createAdapter(pubClient, subClient);
	}

	createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, options);
		server.adapter(this.adapterConstructor);
		return server;
	}
}
