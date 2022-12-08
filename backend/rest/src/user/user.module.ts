import { Module } from '@nestjs/common';
import { TypeormUserRepository } from './repository/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserEntity } from './entities/typeorm-user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TypeormUserEntity])],
	controllers: [],
	providers: [TypeormUserRepository],
	exports: [TypeormUserRepository, TypeOrmModule.forFeature([TypeormUserEntity])],
})
export class UserModule {}
