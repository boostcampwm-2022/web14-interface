import { User } from '@types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
	constructor(user: User) {
		this.uuid = user.uuid;
		this.nickname = user.nickname;
		this.role = user.role;
		this.roomUUID = user.roomUUID;
		this.video = user.video;
		this.audio = user.audio;
	}

	@IsString()
	@IsNotEmpty()
	private uuid: string;

	@IsString()
	@IsNotEmpty()
	private nickname: string;

	@IsString()
	@IsNotEmpty()
	private role: string;

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
