import {
	HTTP_ERROR_MSG,
	INTERVIEW_REPOSITORY_INTERFACE,
	OBJECT_STORAGE_BUCKET,
	OBJECT_STORAGE_ENDPOINT,
} from '@constant';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { FeedbackBoxDto, FeedbackRequestDto } from '../dto/feedback.dto';
import { Feedback } from '../entities/feedback.entity';
import { InterviewDocs } from '../entities/interview-docs.entity';
import { InterviewRepository } from '../repository/interview.repository';
import { getRandomNickname } from '@woowa-babble/random-nickname';
import { DocsWhereCondition } from 'src/types/query.type';
import { DocsResponseDto, UserFeedback } from '../dto/docs.dto';
import { DocsListResponseDto } from '../dto/docs-list.dto';
import { DocsResponseDtoBuilder } from '../dto/response-docs.builder';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(INTERVIEW_REPOSITORY_INTERFACE)
		private readonly interviewRepository: InterviewRepository<InterviewDocs<Feedback>>
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
		const docsUUID = docsRequestDto.docsUUID;
		const videoUrl = [OBJECT_STORAGE_ENDPOINT, OBJECT_STORAGE_BUCKET, userId, docsUUID].join(
			'/'
		);

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
	}): Promise<void> {
		const { docsUUID, feedbackList } = feedbackRequestDto;
		const docs = await this.interviewRepository.getInterviewDocsByDocsUUID(docsUUID);
		if (!docs) throw new BadRequestException(HTTP_ERROR_MSG.NOT_FOUND_MATCHED_DOCS);

		const feedbackVoList = feedbackList.map((feedbackBoxDto: FeedbackBoxDto) => {
			return { userId, docs, feedbackBoxDto };
		});
		await this.interviewRepository.saveFeedbackList(feedbackVoList);
	}

	/**
	 * docsUUID에 해당하는 interview docs와 feedback들을 반환합니다.
	 * @param docsUUID docs UUID
	 * @returns DocsResponseDto
	 */
	async getInterviewDocs(docsUUID: string): Promise<DocsResponseDto> {
		const docs = await this.interviewRepository.getInterviewDocs(docsUUID);
		const { id, createdAt, videoPlayTime, videoUrl, feedbackList } = docs;

		const docsResponseDto = new DocsResponseDtoBuilder()
			.setDocsUUID(id)
			.setCreatedAt(createdAt)
			.setVideoPlayTime(videoPlayTime)
			.setVideoUrl(videoUrl)
			.setFeedback(this.parseFeedbackByUserId(feedbackList))
			.build();

		return docsResponseDto;
	}

	/**
	 * UserFeedback의 배열을 반환합니다.
	 * @param feedbackList
	 * @returns UserFeedback[]
	 */
	parseFeedbackByUserId(feedbackList: Feedback[]) {
		const result: UserFeedback[] = [];
		const userFeedbackMap = new Map<string, FeedbackBoxDto[]>();
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
		if (!docs || docs.userId !== userId) {
			throw new BadRequestException(HTTP_ERROR_MSG.CANT_DELETE_ANOTHER_DOCS);
		}

		await this.interviewRepository.deleteInterviewDocs(docsUUID);
	}
}
