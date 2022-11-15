import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeormUserRepository } from 'src/user/repository/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { USER_REPOSITORY_INTERFACE } from '@constant';

const userRepository: ClassProvider = {
	provide: USER_REPOSITORY_INTERFACE,
	useClass: TypeormUserRepository,
};

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [AuthController],
	providers: [AuthService, userRepository],
})
export class AuthModule {}
