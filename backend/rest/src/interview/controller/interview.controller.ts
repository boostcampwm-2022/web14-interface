import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { JwtPayload } from '@types';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { DocsRequestDto } from '../dto/request-docs.dto';
import { InterviewService } from '../service/interview.service';
import { Request } from 'express';
import { FeedbackRequestDto } from '../dto/feedback.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	CREATE_FEEDBACK_DOCS_SWAGGER,
	CREATE_INTERVIEW_DOCS_SWAGGER,
	DELETE_INTERVIEW_DOCS_SWAGGER,
	GET_INTERVIEW_DOCS_LIST_SWAGGER,
	GET_INTERVIEW_DOCS_SWAGGER,
} from '@constant';

@ApiTags('interview')
@UseGuards(JwtAuthGuard)
@Controller('interview')
export class InterviewController {
	constructor(private readonly interviewService: InterviewService) {}

	@ApiOperation(CREATE_INTERVIEW_DOCS_SWAGGER.SUMMARY)
	@ApiResponse(CREATE_INTERVIEW_DOCS_SWAGGER.SUCCESS)
	@ApiResponse(CREATE_INTERVIEW_DOCS_SWAGGER.FAIL)
	@ApiBody(CREATE_INTERVIEW_DOCS_SWAGGER.BODY)
	@Post('docs')
	async createInterviewDocs(@Req() req: Request, @Body() docsRequestDto: DocsRequestDto) {
		const payload = req.user as JwtPayload;

		await this.interviewService.createInterviewDocs({ userId: payload.id, docsRequestDto });
		return {};
	}

	@ApiOperation(CREATE_FEEDBACK_DOCS_SWAGGER.SUMMARY)
	@ApiResponse(CREATE_FEEDBACK_DOCS_SWAGGER.SUCCESS)
	@ApiResponse(CREATE_FEEDBACK_DOCS_SWAGGER.FAIL)
	@ApiBody(CREATE_FEEDBACK_DOCS_SWAGGER.BODY)
	@Post('feedback')
	async createFeedback(@Req() req: Request, @Body() feedbackRequestDto: FeedbackRequestDto) {
		const payload = req.user as JwtPayload;
		await this.interviewService.saveFeedback({ userId: payload.id, feedbackRequestDto });
		return {};
	}

	@ApiOperation(GET_INTERVIEW_DOCS_SWAGGER.SUMMARY)
	@ApiResponse(GET_INTERVIEW_DOCS_SWAGGER.SUCCESS)
	@ApiResponse(GET_INTERVIEW_DOCS_SWAGGER.FAIL)
	@Get('docs/:docsUUID')
	async getInterviewDocs(@Param('docsUUID') docsUUID: string) {
		const interviewDocs = await this.interviewService.getInterviewDocs(docsUUID);

		return interviewDocs;
	}

	@ApiOperation(GET_INTERVIEW_DOCS_LIST_SWAGGER.SUMMARY)
	@ApiResponse(GET_INTERVIEW_DOCS_LIST_SWAGGER.SUCCESS)
	@ApiResponse(GET_INTERVIEW_DOCS_LIST_SWAGGER.FAIL)
	@Get('docs-list')
	async getInterviewDocsList(@Req() req: Request, @Query('room-uuid') roomUUID: string) {
		const payload = req.user as JwtPayload;
		const interviewDocsList = await this.interviewService.getInterviewDocsList({
			userId: payload.id,
			roomUUID,
		});

		return interviewDocsList;
	}

	@ApiOperation(DELETE_INTERVIEW_DOCS_SWAGGER.SUMMARY)
	@ApiResponse(DELETE_INTERVIEW_DOCS_SWAGGER.SUCCESS)
	@ApiResponse(DELETE_INTERVIEW_DOCS_SWAGGER.FAIL)
	@Delete('docs/:docsUUID')
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteInterviewDocs(@Req() req: Request, @Param('docsUUID') docsUUID: string) {
		const payload = req.user as JwtPayload;
		await this.interviewService.deleteInterviewDocs({ userId: payload.id, docsUUID });
		return {};
	}
}
