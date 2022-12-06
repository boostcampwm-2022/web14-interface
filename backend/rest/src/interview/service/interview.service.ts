import { INTERVIEW_REPOSITORY_INTERFACE, OBJECT_STORAGE_ENDPOINT } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { InterviewDocs } from '../entities/interview-docs.entity';
import { InterviewRepository } from '../repository/interview.repository';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(INTERVIEW_REPOSITORY_INTERFACE)
		private readonly userRepository: InterviewRepository<InterviewDocs>,
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

		await this.userRepository.saveInterviewDocs({
			userId,
			videoUrl,
			docsDto: docsRequestDto,
		});

		return docsUUID;
	}
}
