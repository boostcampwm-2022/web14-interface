import { IsBoolean, IsDate } from 'class-validator';
import { Column } from 'typeorm';

export class TypeormBaseEntity {
	@Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	@IsDate()
	createdAt: Date;

	@Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	@IsDate()
	updatedAt: Date;

	@Column({ name: 'is_deleted', default: false })
	@IsBoolean()
	isDeleted: boolean;
}
