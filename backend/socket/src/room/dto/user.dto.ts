import { User } from '@types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
	constructor(user: User) {
		this.uuid = user.uuid;
		this.nickname = user.nickname;
		this.role = user.role;
		this.roomUUID = user.roomUUID;
		this.video = Boolean(user.video);
		this.audio = Boolean(user.audio);
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

	@IsBoolean()
	@IsNotEmpty()
	video: boolean;

	@IsBoolean()
	@IsNotEmpty()
	audio: boolean;
}
