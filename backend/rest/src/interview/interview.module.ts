import { INTERVIEW_REPOSITORY_INTERFACE } from '@constant';
import { ClassProvider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './controller/interview.controller';
import { TypeormFeedbackEntity } from './entities/typeorm-feedback.entity';
import { TypeormInterviewDocsEntity } from './entities/typeorm-interview-docs.entity';
import { TypeormInterviewRepository } from './repository/typeorm-interview.repository';
import { InterviewService } from './service/interview.service';

export const InterviewRepository: ClassProvider = {
	provide: INTERVIEW_REPOSITORY_INTERFACE,
	useClass: TypeormInterviewRepository,
};

@Module({
	imports: [TypeOrmModule.forFeature([TypeormInterviewDocsEntity, TypeormFeedbackEntity])],
	controllers: [InterviewController],
	providers: [InterviewService, InterviewRepository],
})
export class InterviewModule {}
