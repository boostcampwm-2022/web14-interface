import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectUrlResponseDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'https://nid.naver.com/oauth2.0/authorize?',
		description: 'redirect url입니다.',
	})
	url: string;

	constructor(pageUrl: string) {
		this.url = pageUrl;
	}
}
