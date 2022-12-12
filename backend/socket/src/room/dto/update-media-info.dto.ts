import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMediaDto {
	@IsBoolean()
	@IsNotEmpty()
	video?: boolean;

	@IsBoolean()
	@IsNotEmpty()
	audio?: boolean;
}
