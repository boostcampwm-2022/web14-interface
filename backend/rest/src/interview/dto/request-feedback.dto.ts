import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeedbackRequestDto {
	@IsString()
	@IsNotEmpty()
	docsUUID: string;

	@IsNotEmpty()
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
