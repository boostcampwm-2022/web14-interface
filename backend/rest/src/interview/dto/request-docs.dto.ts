import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DocsRequestDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '1162bd9d-0db7-403c-a32d-fdd2db00ca0b',
		description: 'docs uuid',
	})
	docsUUID: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 3000,
		description: '영상의 총 재생 시간',
	})
	videoPlayTime: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'e8da1496-2d7c-4536-a8e5-5f6a72311e4c',
		description: 'room uuid',
	})
	roomUUID: string;
}
