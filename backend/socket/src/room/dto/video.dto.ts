import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VideoBlobDto {
	@IsNotEmpty()
	@IsNumber()
	timestamp: number;

	@IsString()
	@IsNotEmpty()
	data: string;
}
