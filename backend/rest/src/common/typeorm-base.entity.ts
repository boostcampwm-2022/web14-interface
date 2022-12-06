import { Column } from 'typeorm';

export class TypeormBaseEntity {
	@Column({ name: 'created_at', type: 'date' })
	createdAt: string;

	@Column({ name: 'updated_at', type: 'date' })
	updatedAt: string;

	@Column({ name: 'is_deleted', default: false })
	isDeleted: boolean;
}
