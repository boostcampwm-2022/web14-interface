import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMediaDto {
	@IsString()
	@IsNotEmpty()
	@Transform((obj) => String(obj.value))
	video?: string;

	@IsString()
	@IsNotEmpty()
	@Transform((obj) => String(obj.value))
	audio?: string;
}
