import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/types/auth.type';
import { Repository } from 'typeorm';
import { JoinUserBuilder, UserEntity } from '../entities/typeorm-user.entity';
import { UserRepository } from './interface-user.repository';

@Injectable()
export class TypeormUserRepository implements UserRepository<UserEntity> {
	constructor(
		@InjectRepository(UserEntity)
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
