import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeormUserRepository } from 'src/user/repository/user.typeorm.repository';
import { USER_REPOSITORY_INTERFACE } from '@constant';
import { UserModule } from 'src/user/user.module';

const userRepository: ClassProvider = {
	provide: USER_REPOSITORY_INTERFACE,
	useClass: TypeormUserRepository,
};

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [AuthService, userRepository],
})
export class AuthModule {}
