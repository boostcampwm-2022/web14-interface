import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMediaDto {
	@IsBoolean()
	@IsNotEmpty()
	@Transform((bool) => Number(bool))
	video?: number;

	@IsBoolean()
	@IsNotEmpty()
	@Transform((bool) => Number(bool))
	audio?: number;
}
