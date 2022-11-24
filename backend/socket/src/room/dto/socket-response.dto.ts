import { IsString, IsObject, IsNotEmpty } from 'class-validator';

export class SocketResponseDto {
	constructor({ success, data = null, message = null }) {
		this.success = success;
		this.data = data;
		this.message = message;
	}

	@IsNotEmpty()
	@IsString()
	success: string;

	@IsObject()
	data: unknown;

	@IsString()
	message: string;
}
