import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMediaDto {
	@IsBoolean()
	@IsNotEmpty()
	video?: string;

	@IsBoolean()
	@IsNotEmpty()
	audio?: string;
}
