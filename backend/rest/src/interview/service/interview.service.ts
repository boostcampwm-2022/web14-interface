import { HTTP_ERROR_MSG, INTERVIEW_REPOSITORY_INTERFACE, OBJECT_STORAGE_ENDPOINT } from '@constant';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { feedbackBoxDto, FeedbackRequestDto } from '../dto/request-feedback.dto';
import { Feedback } from '../entities/feedback.entity';
import { InterviewDocs } from '../entities/interview-docs.entity';
import { InterviewRepository } from '../repository/interview.repository';
import { getRandomNickname } from '@woowa-babble/random-nickname';
import { DocsWhereCondition } from 'src/types/query.type';
import { DocsResponseDto, UserFeedback } from '../dto/response-docs.dto';

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
		if (!docs) throw new BadRequestException(HTTP_ERROR_MSG.NOT_FOUND_MATCHED_DOCS);

		await Promise.all(
			feedbackList.map((feedbackBoxDto: feedbackBoxDto) => {
				return this.interviewRepository.saveFeedback({ userId, docs, feedbackBoxDto });
			})
		);

		return userId;
	}

	async getInterviewDocs(docsUUID: string): Promise<DocsResponseDto> {
		const docs = await this.interviewRepository.getInterviewDocsListByUserId(docsUUID);

		const result: DocsResponseDto = {
			docsUUID: docs.id,
			createdAt: docs.createdAt,
			videoPlayTime: docs.videoPlayTime,
			feedbacks: this.parseFeedbackByUserId(docs.feedbackList),
		};

		return result;
	}

	parseFeedbackByUserId(feedbackList: Feedback[]) {
		const result: UserFeedback[] = [];
		const userFeedbackMap = new Map<string, feedbackBoxDto[]>();
		feedbackList.forEach(({ userId, startTime, innerIndex, content }: Feedback) => {
			if (!userFeedbackMap.has(userId)) {
				userFeedbackMap.set(userId, []);
				const userFeedback: UserFeedback = {
					nickname: getRandomNickname('monsters'),
					feedbackList: userFeedbackMap.get(userId),
				};
				result.push(userFeedback);
			}
			const feedbackDto = { startTime, innerIndex, content };
			userFeedbackMap.get(userId).push(feedbackDto);
		});
		return result;
	}

	async getInterviewDocsList({ userId, roomUUID }: DocsWhereCondition) {
		const whereCondition: DocsWhereCondition = { userId };
		if (roomUUID) {
			whereCondition.roomUUID = roomUUID;
		}

		const docsList = await this.interviewRepository.getInterviewDocsInRoomOrGlobalByUserId(
			whereCondition
		);

		return docsList;
	}
}
