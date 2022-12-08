import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtPayload } from '@types';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { InterviewService } from '../service/interview.service';
import { Request } from 'express';
import { FeedbackRequestDto } from '../dto/request-feedback.dto';

@UseGuards(JwtAuthGuard)
@Controller('interview')
export class InterviewController {
	constructor(private readonly interviewService: InterviewService) {}

	@Post('docs')
	async createInterviewDocs(@Req() req: Request, @Body() docsRequestDto: DocsRequestDto) {
		const payload = req.user as JwtPayload;

		await this.interviewService.createInterviewDocs({ userId: payload.id, docsRequestDto });
		return {};
	}

	@Post('feedback')
	async createFeedback(@Req() req: Request, @Body() feedbackRequestDto: FeedbackRequestDto) {
		const payload = req.user as JwtPayload;
		await this.interviewService.saveFeedback({ userId: payload.id, feedbackRequestDto });
		return {};
	}

	@Get('docs/:docsUUID')
	async getInterviewDocs(@Param('docsUUID') docsUUID: string) {
		const interviewDocs = await this.interviewService.getInterviewDocs(docsUUID);

		return interviewDocs;
	}

	@Get('docs-list')
	async getInterviewDocsList(@Req() req: Request, @Query('room-uuid') roomUUID: string) {
		const payload = req.user as JwtPayload;
		const interviewDocsList = await this.interviewService.getInterviewDocsList({
			userId: payload.id,
			roomUUID,
		});

		return interviewDocsList;
	}
}
