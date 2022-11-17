import { IsEmail, IsString } from 'class-validator';

export class CreateJwtDto {
	@IsString()
	nickname: string;

	@IsEmail()
	email: string;
}
