import { User } from '@types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
	constructor(user: User) {
		this.uuid = user.uuid;
		this.nickname = user.nickname;
		this.role = user.role;
		this.roomUUID = user.roomUUID;
		this.video = Number(user.video);
		this.audio = Number(user.audio);
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
	video: number;

	@IsNumber()
	@IsNotEmpty()
	audio: number;
}
