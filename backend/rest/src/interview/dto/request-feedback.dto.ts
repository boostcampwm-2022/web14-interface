import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeedbackRequestDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '1162bd9d-0db7-403c-a32d-fdd2db00ca0b',
		description: 'docs uuid',
	})
	docsUUID: string;

	@IsNotEmpty()
	@ApiProperty({
		example: '{ startTime: 0, innerIndex: 0, content: "목소리에서 울림이 느껴지네요." }',
		description: 'feedbackbox (startTime, innerIndex, content)',
		type: 'array',
		items: {
			type: 'feedbackBoxDto',
		},
	})
	feedbackList: feedbackBoxDto[];
}

export class feedbackBoxDto {
	@IsNumber()
	@IsNotEmpty()
	startTime: number;

	@IsNumber()
	@IsNotEmpty()
	innerIndex: number;

	@IsString()
	@IsNotEmpty()
	content: string;
}
