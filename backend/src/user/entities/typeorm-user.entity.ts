import { BaseBuilder } from 'src/builder/core.builder';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
	@PrimaryColumn({ length: 45 })
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

export class JoinUserBuilder extends BaseBuilder<UserEntity> {
	constructor() {
		super(UserEntity);
	}

	setId(id: string): JoinUserBuilder {
		this.instance.id = id;
		return this;
	}

	setPassword(password: string): JoinUserBuilder {
		this.instance.password = password;
		return this;
	}

	setEmail(email: string): JoinUserBuilder {
		this.instance.email = email;
		return this;
	}

	setNickname(nickname: string): JoinUserBuilder {
		this.instance.nickname = nickname;
		return this;
	}

	setOauthType(oauthType: string): JoinUserBuilder {
		this.instance.oauthType = oauthType;
		return this;
	}

	setDefaultValue(): JoinUserBuilder {
		const now = new Date();
		const dateString = `${now.getFullYear()}:${now.getMonth() + 1}:${now.getDate()}`;
		this.instance.createdAt = dateString;
		this.instance.updatedAt = dateString;
		return this;
	}
}
