import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserIdResponseDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '2vLh8WexsWfhQHLQ8ao5YniAAHvk3g6-djZsdV5xn5',
		description: 'OAUTH user id입니다.',
	})
	userId: string;

	constructor(userId: string) {
		this.userId = userId;
	}
}
