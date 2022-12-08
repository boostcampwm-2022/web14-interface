import { TypeormBaseEntity } from 'src/common/typeorm-base.entity';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user')
export class TypeormUserEntity extends TypeormBaseEntity implements UserEntity {
	@PrimaryColumn({ length: 100 })
	id: string;

	@Column({ length: 200, default: '' })
	password: string;

	@Column({ length: 45, default: '' })
	email: string;

	@Column({ length: 10, default: 'none' })
	oauthType: string;
}
