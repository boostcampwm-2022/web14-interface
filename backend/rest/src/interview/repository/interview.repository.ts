import { DocsWhereCondition } from 'src/types/query.type';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { feedbackBoxDto } from '../dto/request-feedback.dto';

export interface InterviewRepository<T> {
	/**
	 * 전달 받은 docs의 정보를 바탕으로 docs를 db에 저장합니다.
	 * @param userId user id
	 * @param videoUrl storage object url
	 * @param docsDto docsUUiD, videoPlayTime, roomUUID
	 * @returns docs uuid
	 */
	saveInterviewDocs({
		userId,
		videoUrl,
		docsDto,
	}: {
		userId: string;
		videoUrl: string;
		docsDto: DocsRequestDto;
	}): Promise<string>;

	/**
	 * docs UUID에 해당하는 docs와 feedback들을 정렬하여 반환합니다.
	 * @param docsUUID docs UUID
	 * @returns InterviewDocsEntity
	 */
	getInterviewDocsList(docsUUID: string): Promise<T>;

	/**
	 * docs UUID로 interview docs를 찾습니다.
	 * @param docsUUID docs UUID
	 * @returns InterviewDocsEntity
	 */
	getInterviewDocsByDocsUUID(docsUUID: string): Promise<T>;

	/**
	 * room UUID가 있을 경우 해당 room UUID에서 생성된 interview docs를 반환하고
	 * room UUID가 없을 경우 user id에 해당하는 유저의 모든 interview docs를 반환합니다.
	 * @param whereCondition user id와 room UUID
	 * @returns InterviewDocsEntity[]
	 */
	getInterviewDocsInRoomOrGlobalByUserId(whereCondition: DocsWhereCondition): Promise<T[]>;

	/**
	 * docs UUID에 해당하는 interview docs를 삭제합니다.
	 * @param docsUUID
	 * @returns docs UUID
	 */
	deleteInterviewDocs(docsUUID: string): Promise<string>;

	/**
	 * feedback을 저장합니다.
	 * @param userId user id
	 * @param docs docs Entity
	 * @param feedbackBoxDto startTime, innerIndex, content
	 * @returns feedback id
	 */
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
