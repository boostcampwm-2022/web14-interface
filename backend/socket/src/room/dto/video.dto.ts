import { IsNotEmpty, IsNumber } from 'class-validator';

export class VideoBlobDto {
	@IsNotEmpty()
	@IsNumber()
	timestamp: number;

	@IsNotEmpty()
	data: Blob;
}
