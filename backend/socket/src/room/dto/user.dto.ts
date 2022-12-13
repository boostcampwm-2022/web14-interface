import { User } from '@types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
	constructor(user: User) {
		this.uuid = user.uuid;
		this.nickname = user.nickname;
		this.role = user.role;
		this.roomUUID = user.roomUUID;
		this.video = user.video;
		this.audio = user.video;
	}

	@IsString()
	@IsNotEmpty()
	uuid: string;

	@IsString()
	@IsNotEmpty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	role: string;

	@IsString()
	@IsNotEmpty()
	roomUUID: string;

	@IsNumber()
	@IsNotEmpty()
	@Transform((str) => Number(str))
	video: number;

	@IsNumber()
	@IsNotEmpty()
	@Transform((str) => Number(str))
	audio: number;
}
