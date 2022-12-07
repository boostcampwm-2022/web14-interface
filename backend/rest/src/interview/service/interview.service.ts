import { INTERVIEW_REPOSITORY_INTERFACE, OBJECT_STORAGE_ENDPOINT } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { feedbackBoxDto, FeedbackRequestDto } from '../dto/request-feedback.dto';
import { Feedback } from '../entities/feedback.entity';
import { InterviewDocs } from '../entities/interview-docs.entity';
import { InterviewRepository } from '../repository/interview.repository';
import { getRandomNickname } from '@woowa-babble/random-nickname';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(INTERVIEW_REPOSITORY_INTERFACE)
		private readonly interviewRepository: InterviewRepository<InterviewDocs<Feedback>>,
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

		const userSet = new Set();
		return docsList.map((docs) => {
			return {
				...docs,
				feedbackList: docs.feedbackList.reduce((prev, feedback) => {
					if (!userSet.has(feedback.userId)) {
						userSet.add(feedback.userId);
						prev.push({
							nickname: getRandomNickname('monsters'),
							feedbackList: [feedback],
						});
					} else {
						prev.at(-1).feedbackList.push(feedback);
					}
					return prev;
				}, []),
			};
		});
	}
}
