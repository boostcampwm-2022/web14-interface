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
import { FeedbackRequestDto } from '../dto/request-feedback.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocsResponseDto } from '../dto/response-docs.dto';

@ApiTags('interview')
@UseGuards(JwtAuthGuard)
@Controller('interview')
export class InterviewController {
	constructor(private readonly interviewService: InterviewService) {}

	@ApiOperation({ summary: 'interview docs 생성하기' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: '생성 성공',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '생성 실패',
	})
	@Post('docs')
	async createInterviewDocs(@Req() req: Request, @Body() docsRequestDto: DocsRequestDto) {
		const payload = req.user as JwtPayload;

		await this.interviewService.createInterviewDocs({ userId: payload.id, docsRequestDto });
		return {};
	}

	@ApiOperation({ summary: 'feedback 생성하기' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: '생성 성공',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '생성 실패',
	})
	@Post('feedback')
	async createFeedback(@Req() req: Request, @Body() feedbackRequestDto: FeedbackRequestDto) {
		const payload = req.user as JwtPayload;
		await this.interviewService.saveFeedback({ userId: payload.id, feedbackRequestDto });
		return {};
	}

	@ApiOperation({ summary: 'docs UUID로 interview docs 가져오기' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: '성공',
		type: DocsResponseDto,
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	})
	@Get('docs/:docsUUID')
	async getInterviewDocs(@Param('docsUUID') docsUUID: string) {
		const interviewDocs = await this.interviewService.getInterviewDocs(docsUUID);

		return interviewDocs;
	}

	@ApiOperation({ summary: 'interview docs list 가져오기' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: '성공',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	})
	@Get('docs-list')
	async getInterviewDocsList(@Req() req: Request, @Query('room-uuid') roomUUID: string) {
		const payload = req.user as JwtPayload;
		const interviewDocsList = await this.interviewService.getInterviewDocsList({
			userId: payload.id,
			roomUUID,
		});

		return interviewDocsList;
	}

	@ApiOperation({ summary: 'interview docs 삭제하기' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: '삭제 성공',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	})
	@Delete('docs/:docsUUID')
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteInterviewDocs(@Req() req: Request, @Param('docsUUID') docsUUID: string) {
		const payload = req.user as JwtPayload;
		await this.interviewService.deleteInterviewDocs({ userId: payload.id, docsUUID });
		return {};
	}
}
