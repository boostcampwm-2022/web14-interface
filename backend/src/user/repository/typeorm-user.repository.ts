import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository-interface';

@Injectable()
export class TypeormUserRepository implements UserRepository {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	async saveUser(user: UserEntity): Promise<string> {
		console.log(user);
		// await this.userRepository.insert(user);
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
}
