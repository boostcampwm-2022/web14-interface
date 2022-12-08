import { TypeormUserEntity } from 'src/user/entities/typeorm-user.entity';
import { BaseBuilder } from '../../common/base.builder';

export class JoinUserBuilder extends BaseBuilder<TypeormUserEntity> {
	constructor() {
		super(TypeormUserEntity);
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

	setOauthType(oauthType: string): JoinUserBuilder {
		this.instance.oauthType = oauthType;
		return this;
	}
}
