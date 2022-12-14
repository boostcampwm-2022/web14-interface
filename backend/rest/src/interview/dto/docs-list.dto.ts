import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DocsListResponseDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '1162bd9d-0db7-403c-a32d-fdd2db00ca0b',
		description: 'docs uuid',
	})
	id: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: '123',
		description: '영상 재생시간입니다.',
	})
	videoPlayTime: number;

	@IsDate()
	@IsNotEmpty()
	@ApiProperty({
		example: '2022-12-13',
		description: '생성 날짜입니다.',
	})
	createdAt: Date;

	constructor({
		id,
		videoPlayTime,
		createdAt,
	}: {
		id: string;
		videoPlayTime: number;
		createdAt: Date;
	}) {
		this.id = id;
		this.videoPlayTime = videoPlayTime;
		this.createdAt = createdAt;
	}
}
