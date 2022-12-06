import { INTERVIEW_REPOSITORY_INTERFACE, OBJECT_STORAGE_ENDPOINT } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { feedbackBoxDto, FeedbackRequestDto } from '../dto/request-feedback.dto';
import { InterviewDocs } from '../entities/interview-docs.entity';
import { InterviewRepository } from '../repository/interview.repository';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(INTERVIEW_REPOSITORY_INTERFACE)
		private readonly interviewRepository: InterviewRepository<InterviewDocs>,
		private readonly configService: ConfigService
	) {}

	async createInterviewDocs({
		userId,
		docsRequestDto,
	}: {
		userId: string;
		docsRequestDto: DocsRequestDto;
	}): Promise<string> {
		const objectStorageUrl = this.configService.get(OBJECT_STORAGE_ENDPOINT);
		const docsUUID = docsRequestDto.docsUUID;
		const videoUrl = [objectStorageUrl, userId, docsUUID].join('/');

		await this.interviewRepository.saveInterviewDocs({
			userId,
			videoUrl,
			docsDto: docsRequestDto,
		});

		return docsUUID;
	}

	async saveFeedback({
		userId,
		feedbackRequestDto,
	}: {
		userId: string;
		feedbackRequestDto: FeedbackRequestDto;
	}): Promise<string> {
		const { docsUUID, feedbackList } = feedbackRequestDto;
		const docs = await this.interviewRepository.getInterviewDocsByDocsUUID(docsUUID);

		await Promise.all(
			feedbackList.map((feedbackBoxDto: feedbackBoxDto) => {
				return this.interviewRepository.saveFeedback({ userId, docs, feedbackBoxDto });
			})
		);

		return userId;
	}

	async getInterviewDocs(userId: string) {
		const docsList = await this.interviewRepository.getInterviewDocsListByUserId(userId);
		return docsList;
	}
}
