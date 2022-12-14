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
import { DocsGetResponseDto, UserFeedback } from '../dto/docs.dto';
import { DocsListResponseDto } from '../dto/docs-list.dto';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(INTERVIEW_REPOSITORY_INTERFACE)
		private readonly interviewRepository: InterviewRepository<InterviewDocs<Feedback>>,
		private readonly configService: ConfigService
	) {}

	/**
	 * interview docs를 만들고 저장합니다.
	 * @param userId user UUID
	 * @param docsRequestDto docs UUID, videoPlayTIme, roomUUID
	 * @returns docsUUID
	 */
	async createInterviewDocs({
		userId,
		docsRequestDto,
	}: {
		userId: string;
		docsRequestDto: DocsRequestDto;
	}): Promise<string> {
		const objectStorageUrl = OBJECT_STORAGE_ENDPOINT;
		const docsUUID = docsRequestDto.docsUUID;
		const videoUrl = [objectStorageUrl, userId, docsUUID].join('/');

		await this.interviewRepository.saveInterviewDocs({
			userId,
			videoUrl,
			docsDto: docsRequestDto,
		});

		return docsUUID;
	}

	/**
	 * docs UUID에 해당하는 feedback들을 저장합니다.
	 * @param userId user id
	 * @returns userId user id
	 */
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

	/**
	 * docsUUID에 해당하는 interview docs와 feedback들을 반환합니다.
	 * @param docsUUID docs UUID
	 * @returns DocsResponseDto
	 */
	async getInterviewDocs(docsUUID: string): Promise<DocsGetResponseDto> {
		const docs = await this.interviewRepository.getInterviewDocs(docsUUID);

		const result: DocsGetResponseDto = {
			docsUUID: docs.id,
			createdAt: docs.createdAt,
			videoPlayTime: docs.videoPlayTime,
			feedbacks: this.parseFeedbackByUserId(docs.feedbackList),
		};

		return result;
	}

	/**
	 * UserFeedback의 배열을 반환합니다.
	 * @param feedbackList
	 * @returns UserFeedback[]
	 */
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

	/**
	 * DocsWhereCondition에 따른 docsList를 반환합니다.
	 * @param param0
	 * @returns docsList
	 */
	async getInterviewDocsList({ userId, roomUUID }: DocsWhereCondition) {
		const whereCondition: DocsWhereCondition = { userId };
		if (roomUUID) {
			whereCondition.roomUUID = roomUUID;
		}

		const docsList = await this.interviewRepository.getInterviewDocsInRoomOrGlobalByUserId(
			whereCondition
		);

		return docsList.reduce((prev: DocsListResponseDto[], docs: DocsListResponseDto) => {
			const { id, videoPlayTime, createdAt } = docs;

			const docsListResponseDto = new DocsListResponseDto({ id, videoPlayTime, createdAt });
			prev.push(docsListResponseDto);
			return prev;
		}, []);
	}

	/**
	 * docs UUID에 해당하는 interview docs를 삭제합니다.
	 * @param userId user id
	 * @param docsUUID docs uuid
	 */
	async deleteInterviewDocs({ userId, docsUUID }: { userId: string; docsUUID: string }) {
		const docs = await this.interviewRepository.getInterviewDocsByDocsUUID(docsUUID);
		if (docs.userId !== userId) {
			throw new BadRequestException(HTTP_ERROR_MSG.CANT_DELETE_ANOTHER_DOCS);
		}

		await this.interviewRepository.deleteInterviewDocs(docsUUID);
	}
}
