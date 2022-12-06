import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { feedbackBoxDto } from '../dto/request-feedback.dto';
import { FeedbackBuilder } from '../entities/typeorm-feedback.builder';
import { TypeormFeedbackEntity } from '../entities/typeorm-feedback.entity';
import { InterviewDocsBuilder } from '../entities/typeorm-interview-docs.builder';
import { TypeormInterviewDocsEntity } from '../entities/typeorm-interview-docs.entity';
import { InterviewRepository } from './interview.repository';

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
		const { docsUUID, videoPlayTime } = docsDto;
		const interviewDocsDao = new InterviewDocsBuilder()
			.setId(docsUUID)
			.setUserId(userId)
			.setVideoUrl(videoUrl)
			.setVideoPlayTime(videoPlayTime)
			.build();

		const docs = await this.interviewDocsRepository.save(interviewDocsDao);
		return docs.id;
	}

	async getInterviewDocs(userId: string): Promise<TypeormInterviewDocsEntity[]> {
		const interviewDocs = await this.interviewDocsRepository.find({
			where: { userId },
			relations: ['feedbackList'],
			order: {
				createdAt: 'DESC',
			},
		});

		return interviewDocs;
	}

	async deleteInterviewDocs(docsUUID: string): Promise<string> {
		const result = await this.interviewDocsRepository.delete(docsUUID);
		if (!result.affected) {
			throw new Error();
		}

		return docsUUID;
	}

	async saveFeedback({
		userId,
		feedbackBoxDto,
	}: {
		userId: string;
		feedbackBoxDto: feedbackBoxDto;
	}): Promise<number> {
		const { startTime, innerIndex, content } = feedbackBoxDto;
		const feedback = new FeedbackBuilder()
			.setUserId(userId)
			.setStartTime(startTime)
			.setInnerIndex(innerIndex)
			.setContent(content)
			.build();

		const result = await this.feedbackRepository.save(feedback);
		return result.id;
	}
}
