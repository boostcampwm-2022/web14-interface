import { FeedbackBoxDto } from 'src/interview/dto/feedback.dto';

export interface FeedbackVO<T> {
	readonly userId: string;
	readonly docs: T;
	readonly feedbackBoxDto: FeedbackBoxDto;
}
