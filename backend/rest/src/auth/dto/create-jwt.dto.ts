import { IsEmail, IsString } from 'class-validator';

export class CreateJwtPayloadDto {
	@IsString()
	id: string;

	@IsString()
	nickname: string;

	@IsEmail()
	email: string;
}
