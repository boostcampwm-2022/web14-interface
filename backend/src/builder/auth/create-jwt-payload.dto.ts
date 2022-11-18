import { CreateJwtPayloadDto } from 'src/auth/dto/create-jwt.dto';
import { BaseBuilder } from '../core.builder';

export class JwtPayloadBuiler extends BaseBuilder<CreateJwtPayloadDto> {
	constructor() {
		super(CreateJwtPayloadDto);
	}

	setId(id: string) {
		this.instance.nickname = id;
		return this;
	}

	setNickname(nickname: string) {
		this.instance.nickname = nickname;
		return this;
	}

	setEmail(email: string) {
		this.instance.email = email;
		return this;
	}
}
