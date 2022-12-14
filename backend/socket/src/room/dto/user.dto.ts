import { User } from '@types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
	constructor(user: User) {
		this.uuid = user.uuid;
		this.nickname = user.nickname;
		this.role = user.role;
		this.roomUUID = user.roomUUID;
		this.video = JSON.parse(user.video);
		this.audio = JSON.parse(user.audio);
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

	@IsBoolean()
	@IsNotEmpty()
	video: boolean;

	@IsBoolean()
	@IsNotEmpty()
	audio: boolean;
}
