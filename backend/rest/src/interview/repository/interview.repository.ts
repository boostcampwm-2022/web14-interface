import { DocsWhereCondition } from 'src/types/query.type';
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

	getInterviewDocsListByUserId(docsUUID: string): Promise<T>;

	getInterviewDocsByDocsUUID(docsUUID: string): Promise<T>;

	getInterviewDocsInRoomOrGlobalByUserId(whereCondition: DocsWhereCondition): Promise<T[]>;

	deleteInterviewDocs(docsUUID: string): Promise<string>;

	saveFeedback({
		userId,
		docs,
		feedbackBoxDto,
	}: {
		userId: string;
		docs: T;
		feedbackBoxDto: feedbackBoxDto;
	}): Promise<number>;
}
