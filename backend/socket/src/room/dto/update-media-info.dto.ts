import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateMediaDto {
	@IsNumber()
	@IsNotEmpty()
	video?: number;

	@IsNumber()
	@IsNotEmpty()
	audio?: number;
}
