import { TypeormBaseEntity } from 'src/common/typeorm-base.entity';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UserEntity } from './interface-user.entity';

@Entity('user')
export class TypeormUserEntity extends TypeormBaseEntity implements UserEntity {
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
}
