import { BaseBuilder } from 'src/builder/core.builder';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
	@PrimaryColumn({ length: 100 })
	id: string;

	@Column({ length: 200, default: '' })
	password: string;

	@Column({ length: 45, default: '' })
	email: string;

	@Column({ length: 20, default: '' })
	nickname: string;

	@Column({ length: 10, default: 'none', name: 'oauth_type' })
	oauthType: string;

	@Column({ name: 'created_at', type: 'date' })
	createdAt: string;

	@Column({ name: 'updated_at', type: 'date' })
	updatedAt: string;

	@Column({ name: 'is_deleted', default: false })
	isDeleted: boolean;
}
