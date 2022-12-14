import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMediaDto {
	@IsOptional()
	@IsString()
	@Transform((obj) => String(obj.value))
	video: string;

	@IsOptional()
	@IsString()
	@Transform((obj) => String(obj.value))
	audio: string;
}
