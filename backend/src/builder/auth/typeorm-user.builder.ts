import { UserEntity } from 'src/user/entities/typeorm-user.entity';
import { BaseBuilder } from '../core.builder';

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
