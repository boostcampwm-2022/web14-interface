import { DocsRequestDto } from '../dto/request-docs.dto';

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
}
