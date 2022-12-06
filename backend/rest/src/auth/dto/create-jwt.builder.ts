import { CreateJwtPayloadDto } from 'src/auth/dto/create-jwt.dto';
import { BaseBuilder } from '../../common/base.builder';

export class JwtPayloadBuiler extends BaseBuilder<CreateJwtPayloadDto> {
	constructor() {
		super(CreateJwtPayloadDto);
	}

	setId(id: string) {
		this.instance.id = id;
		return this;
	}

	setEmail(email: string) {
		this.instance.email = email;
		return this;
	}
}
