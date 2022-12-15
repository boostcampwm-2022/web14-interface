import { HTTP_ERROR_MSG } from '@constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocsWhereCondition } from 'src/types/query.type';
import { Repository } from 'typeorm';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { FeedbackBuilder } from '../entities/typeorm-feedback.builder';
import { TypeormFeedbackEntity } from '../entities/typeorm-feedback.entity';
import { InterviewDocsBuilder } from '../entities/typeorm-interview-docs.builder';
import { TypeormInterviewDocsEntity } from '../entities/typeorm-interview-docs.entity';
import { InterviewRepository } from './interview.repository';
import { FeedbackVO } from '@types';

@Injectable()
export class TypeormInterviewRepository implements InterviewRepository<TypeormInterviewDocsEntity> {
	constructor(
		@InjectRepository(TypeormInterviewDocsEntity)
		private readonly interviewDocsRepository: Repository<TypeormInterviewDocsEntity>,

		@InjectRepository(TypeormFeedbackEntity)
		private readonly feedbackRepository: Repository<TypeormFeedbackEntity>
	) {}

	async saveInterviewDocs({
		userId,
		videoUrl,
		docsDto,
	}: {
		userId: string;
		videoUrl: string;
		docsDto: DocsRequestDto;
	}): Promise<string> {
		const { docsUUID, videoPlayTime, roomUUID } = docsDto;
		const interviewDocsDao = new InterviewDocsBuilder()
			.setId(docsUUID)
			.setUserId(userId)
			.setVideoUrl(videoUrl)
			.setVideoPlayTime(videoPlayTime)
			.setRoomUUID(roomUUID)
			.build();

		const docs = await this.interviewDocsRepository.save(interviewDocsDao);

		return docs.id;
	}

	async getInterviewDocs(docsUUID: string): Promise<TypeormInterviewDocsEntity> {
		const interviewDocsList = await this.interviewDocsRepository
			.createQueryBuilder('docs')
			.leftJoinAndSelect('docs.feedbackList', 'fb')
			.where('docs.id = :docsUUID', { docsUUID })
			.orderBy('fb.user_id')
			.addOrderBy('fb.start_time')
			.addOrderBy('fb.inner_index')
			.getOne();

		return interviewDocsList;
	}

	async getInterviewDocsByDocsUUID(docsUUID: string): Promise<TypeormInterviewDocsEntity> {
		const interviewDocs = await this.interviewDocsRepository.findOneBy({ id: docsUUID });
		return interviewDocs;
	}

	async getInterviewDocsInRoomOrGlobalByUserId(whereCondition: DocsWhereCondition) {
		const interviewDocsList = await this.interviewDocsRepository.find({
			select: { createdAt: true, videoPlayTime: true, id: true },
			where: whereCondition,
			order: { createdAt: 'DESC' },
		});
		return interviewDocsList;
	}

	async deleteInterviewDocs(docsUUID: string): Promise<string> {
		const result = await this.interviewDocsRepository.delete(docsUUID);
		if (!result.affected) {
			throw new BadRequestException(HTTP_ERROR_MSG.NOT_FOUND_TARGET_IN_DATABASE);
		}

		return docsUUID;
	}

	async saveFeedbackList(feedbackVoList: FeedbackVO<TypeormInterviewDocsEntity>[]) {
		const feedbackList = feedbackVoList.map((feedbackVO) => {
			const { userId, docs, feedbackBoxDto } = feedbackVO;
			const { startTime, innerIndex, content } = feedbackBoxDto;

			const feedback = new FeedbackBuilder()
				.setUserId(userId)
				.setDocs(docs)
				.setStartTime(startTime)
				.setInnerIndex(innerIndex)
				.setContent(content)
				.build();

			return feedback;
		});

		await this.feedbackRepository
			.createQueryBuilder()
			.insert()
			.into(TypeormFeedbackEntity)
			.values(feedbackList)
			.updateEntity(false)
			.execute();
	}
}
