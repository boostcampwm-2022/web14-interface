import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { feedbackBoxDto } from './request-feedback.dto';

export class DocsGetResponseDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '1162bd9d-0db7-403c-a32d-fdd2db00ca0b',
		description: 'docs uuid',
	})
	docsUUID: string;

	@IsNotEmpty()
	@IsDate()
	@ApiProperty({
		example: '2022-12-09 18:29:24',
		description: '생성 시점',
	})
	createdAt: Date;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		example: '2022-12-09 18:29:24',
		description: '업데이트 시점',
	})
	videoPlayTime: number;

	@ApiProperty({
		example:
			'{ nickname: "엉큼한 거북이", feedbackList: [{ startTime: 0, innerIndex: 0, content: "목소리에서 울림이 느껴지네요." }] }',
		description: '닉네임과 피드백들',
		type: 'array',
		items: {
			type: 'UserFeedback',
		},
	})
	feedbacks: UserFeedback[];
}

export class UserFeedback {
	@IsString()
	@IsNotEmpty()
	nickname: string;

	feedbackList: feedbackBoxDto[];
}
