import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DocsRequestDto {
	@IsString()
	@IsNotEmpty()
	docsUUID: string;

	@IsNumber()
	@IsNotEmpty()
	videoPlayTime: number;

	@IsString()
	@IsNotEmpty()
	roomUUID: string;
}
