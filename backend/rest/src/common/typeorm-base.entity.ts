import { Column, Entity } from 'typeorm';

@Entity()
export class TypeormBaseEntity {
	@Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRETN_TIMESTAMP' })
	createdAt: Date;

	@Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRETN_TIMESTAMP' })
	updatedAt: Date;

	@Column({ name: 'is_deleted', default: false })
	isDeleted: boolean;
}
