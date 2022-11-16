import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeormUserRepository } from './repository/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/typeorm-user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserService, TypeormUserRepository],
	exports: [TypeormUserRepository, TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
