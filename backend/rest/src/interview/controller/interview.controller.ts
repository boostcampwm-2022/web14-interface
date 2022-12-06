import { Controller } from '@nestjs/common';
import { InterviewService } from '../service/interview.service';

@Controller('interview')
export class InterviewController {
	constructor(private readonly interviewService: InterviewService) {}
}
