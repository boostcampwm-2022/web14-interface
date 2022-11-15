import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/types/auth.type';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.interface.repository';

@Injectable()
export class TypeormUserRepository implements UserRepository<UserEntity> {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	async saveUser(user: UserInfo): Promise<string> {
		const userEntity = this.createUserEntity(user);
		console.log(user);
		await this.userRepository.insert(userEntity);
		return user.id;
	}

	async findUserById(id: string): Promise<UserEntity> {
		const user = this.userRepository.findOneBy({ id });
		return user;
	}

	async findAllUser(): Promise<UserEntity[]> {
		const users = this.userRepository.find();
		return users;
	}

	createUserEntity(userInfo: UserInfo): UserEntity {
		const user = new UserEntity();
		user.id = userInfo.id;
		user.password = userInfo.password || '';
		user.email = userInfo.email || '';
		return user;
	}
}
