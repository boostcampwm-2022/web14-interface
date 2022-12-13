import { USER_ROLE } from '@constant';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export enum ChatTarget {
	EVERYONE = 'everyone',
	DRIECT = 'direct',
	ROLE = 'role',
}

export class ChatRequestDto {
	@IsString()
	@IsNotEmpty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	content: string;

	@IsString()
	@IsNotEmpty()
	target: ChatTarget;

	@IsString()
	@IsNotEmpty()
	uuid?: string;

	@IsString()
	@IsNotEmpty()
	role?: USER_ROLE;
}

export class ChatResponseDto {
	constructor(chatRequest: ChatRequestDto) {
		this.nickname = chatRequest.nickname;
		this.content = chatRequest.content;
		this.timestamp = new Date();
	}

	@IsString()
	@IsNotEmpty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	content: string;

	@IsDate()
	@IsNotEmpty()
	timestamp: Date;
}
