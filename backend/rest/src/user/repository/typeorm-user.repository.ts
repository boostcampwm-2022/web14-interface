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

	async saveUser(userInfo: UserInfo): Promise<TypeormUserEntity> {
		const { id, password, email, oauthType } = userInfo;
		const user = new JoinUserBuilder()
			.setId(id)
			.setPassword(password)
			.setEmail(email)
			.setOauthType(oauthType)
			.build();

		const joinedUser = await this.userRepository.save(user);

		return joinedUser;
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
