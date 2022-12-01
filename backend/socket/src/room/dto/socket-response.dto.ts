import { IsString, IsObject, IsNotEmpty, IsBoolean } from 'class-validator';

export class SocketResponseDto {
	constructor({ success = true, data = null, message = null }) {
		this.success = success;
		this.data = data;
		this.message = message;
	}

	@IsBoolean()
	success: boolean;

	@IsObject()
	data: unknown;

	@IsString()
	message: string;
}
