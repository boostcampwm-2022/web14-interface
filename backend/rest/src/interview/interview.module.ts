import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './controller/interview.controller';
import { TypeormFeedbackEntity } from './entities/typeorm-feedback.entity';
import { TypeormInterviewDocsEntity } from './entities/typeorm-interview-docs.entity';
import { InterviewService } from './service/interview.service';

@Module({
	imports: [TypeOrmModule.forFeature([TypeormInterviewDocsEntity, TypeormFeedbackEntity])],
	controllers: [InterviewController],
	providers: [InterviewService],
})
export class InterviewModule {}
