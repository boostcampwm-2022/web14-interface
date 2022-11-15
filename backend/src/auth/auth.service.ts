import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository-interface';

@Injectable()
export class AuthService {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: UserRepository
	) {}

	join() {
		const user = new UserEntity();
		user.id = 'id';
		const id = this.userRepository.saveUser(user);
		return id;
	}
}
