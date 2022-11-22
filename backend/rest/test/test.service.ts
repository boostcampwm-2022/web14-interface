import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class TestService {
	constructor(@Inject('Connection') public connection: Connection) {}

	public async cleanDatabase(): Promise<void> {
		try {
			const entities = this.connection.entityMetadatas;
			const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(', ');

			await this.connection.query(`TRUNCATE ${tableNames} CASCADE;`);
			console.log('[TEST DATABASE]: Clean');
		} catch (error) {
			throw new Error(`ERROR: Cleaning test database: ${error}`);
		}
	}
}
