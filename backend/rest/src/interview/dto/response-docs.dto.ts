import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { feedbackBoxDto } from './request-feedback.dto';

export class DocsResponseDto {
	@IsString()
	@IsNotEmpty()
	docsUUID: string;

	@IsNotEmpty()
	@IsDate()
	createdAt: Date;

	@IsNotEmpty()
	@IsNumber()
	videoPlayTime: number;

	feedbacks: UserFeedback[];
}

export class UserFeedback {
	@IsString()
	@IsNotEmpty()
	nickname: string;

	feedbackList: feedbackBoxDto[];
}
