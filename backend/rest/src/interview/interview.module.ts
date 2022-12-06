import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './controller/interview.controller';
import { InterviewService } from './service/interview.service';

@Module({
	imports: [TypeOrmModule.forFeature([])],
	controllers: [InterviewController],
	providers: [InterviewService],
})
export class InterviewModule {}
