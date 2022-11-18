import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinUserBuilder } from '@builder';
import { UserInfo } from '@types';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/interface-user.entity';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import { UserRepository } from './interface-user.repository';

@Injectable()
export class TypeormUserRepository implements UserRepository {
	constructor(
		@InjectRepository(TypeormUserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async saveUser(userInfo: UserInfo): Promise<UserEntity> {
		const { id, password, email, oauthType, nickname } = userInfo;
		const user = new JoinUserBuilder()
			.setId(id)
			.setPassword(password)
			.setEmail(email)
			.setNickname(nickname)
			.setOauthType(oauthType)
			.setDefaultValue()
			.build();

		await this.userRepository.save(user);
		return user;
	}

	async findUserById(id: string): Promise<UserEntity> {
		const user = this.userRepository.findOneBy({ id });
		return user;
	}

	async findAllUser(): Promise<UserEntity[]> {
		const users = this.userRepository.find();
		return users;
	}
}
