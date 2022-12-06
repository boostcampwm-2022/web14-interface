import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { InterviewDocsBuilder } from '../entities/typeorm-interview-docs.builder';
import { TypeormInterviewDocsEntity } from '../entities/typeorm-interview-docs.entity';
import { InterviewDocsRepository } from './interview.repository';

@Injectable()
export class TypeormInterviewDocsRepository
	implements InterviewDocsRepository<TypeormInterviewDocsEntity>
{
	constructor(
		@InjectRepository(TypeormInterviewDocsEntity)
		private readonly interviewDocsRepository: Repository<TypeormInterviewDocsEntity>
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
}
