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
		console.log(payload);

		await this.interviewService.createInterviewDocs({ userId: payload.id, docsRequestDto });
		return { statusCode: 201 };
	}

	@Post('feedback')
	async createFeedback(@Req() req: Request, @Body() feedbackRequestDto: FeedbackRequestDto) {
		const payload = req.user as JwtPayload;
		await this.interviewService.saveFeedback({ userId: payload.id, feedbackRequestDto });
		return { statusCode: 201 };
	}

	@Get('docs/:docs_uuid')
	async getInterviewDocs(@Req() req: Request, @Param('docs_uuid') docsUUID: string) {
		const payload = req.user as JwtPayload;
		const interviewDocs = await this.interviewService.getInterviewDocs({
			userId: payload.id,
			docsUUID,
		});

		return { statusCode: 201, data: interviewDocs };
	}
}
