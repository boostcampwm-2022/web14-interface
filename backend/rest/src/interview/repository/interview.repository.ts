import { DocsRequestDto } from '../dto/request-docs.dto';
import { feedbackBoxDto } from '../dto/request-feedback.dto';

export interface InterviewRepository<T> {
	saveInterviewDocs({
		userId,
		videoUrl,
		docsDto,
	}: {
		userId: string;
		videoUrl: string;
		docsDto: DocsRequestDto;
	}): Promise<string>;

	getInterviewDocs(userId: string): Promise<T[]>;

	deleteInterviewDocs(docsUUID: string): Promise<string>;

	saveFeedback({
		userId,
		feedbackBoxDto,
	}: {
		userId: string;
		feedbackBoxDto: feedbackBoxDto;
	}): Promise<number>;
}
