import { BaseBuilder } from '@common';
import { DocsResponseDto, UserFeedback } from './docs.dto';

export class DocsResponseDtoBuilder extends BaseBuilder<DocsResponseDto> {
	constructor() {
		super(DocsResponseDto);
	}

	setCreatedAt(createdAt: Date) {
		this.instance.createdAt = createdAt;
		return this;
	}

	setDocsUUID(docsUUID: string) {
		this.instance.docsUUID = docsUUID;
		return this;
	}

	setVideoPlayTime(videoPlayTime: number) {
		this.instance.videoPlayTime = videoPlayTime;
		return this;
	}

	setVideoUrl(videoUrl: string) {
		this.instance.videoUrl = videoUrl;
		return this;
	}

	setFeedback(feedbacks: UserFeedback[]) {
		this.instance.feedbacks = feedbacks;
		return this;
	}
}
