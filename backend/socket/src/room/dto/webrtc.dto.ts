import { IsNotEmpty, IsString } from 'class-validator';

export class WebrtcBaseDto {
	@IsNotEmpty()
	@IsString()
	myId: string;

	@IsNotEmpty()
	@IsString()
	opponentId: string;
}

export class WebrtcOfferDto extends WebrtcBaseDto {
	@IsNotEmpty()
	offer: unknown;
}

export class WebrtcAnswerDto extends WebrtcBaseDto {
	@IsNotEmpty()
	answer: unknown;
}

export class WebrtcIcecandidateDto extends WebrtcBaseDto {
	@IsNotEmpty()
	icecandidate: unknown;
}
