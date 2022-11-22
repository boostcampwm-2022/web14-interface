import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeormUserRepository } from './repository/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserEntity } from './entities/typeorm-user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TypeormUserEntity])],
	controllers: [UserController],
	providers: [UserService, TypeormUserRepository],
	exports: [TypeormUserRepository, TypeOrmModule.forFeature([TypeormUserEntity])],
})
export class UserModule {}
