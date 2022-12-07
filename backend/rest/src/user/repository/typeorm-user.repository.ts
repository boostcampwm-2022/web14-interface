import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinUserBuilder } from '../entities/typeorm-user.builder';
import { UserInfo } from '@types';
import { Repository } from 'typeorm';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class TypeormUserRepository implements UserRepository<TypeormUserEntity> {
	constructor(
		@InjectRepository(TypeormUserEntity)
		private readonly userRepository: Repository<TypeormUserEntity>
	) {}

	// DTO로 만들면 좋을 거 같아요. DTO에서 validation하면 되니까 repo에서 안전하게 사용할 수 있을 거 같네요.
	async saveUser(userInfo: UserInfo): Promise<TypeormUserEntity> {
		const { id, password, email, oauthType } = userInfo;
		const user = new JoinUserBuilder()
			.setId(id)
			.setPassword(password)
			.setEmail(email)
			.setOauthType(oauthType)
			.build();

		await this.userRepository.save(user);
		return user;
	}

	async findUserById(id: string): Promise<TypeormUserEntity> {
		const user = this.userRepository.findOneBy({ id });
		return user;
	}

	async findAllUser(): Promise<TypeormUserEntity[]> {
		const users = this.userRepository.find();
		return users;
	}
}
