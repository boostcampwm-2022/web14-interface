import { BaseBuilder } from '../../common/base.builder';
import { TypeormInterviewDocsEntity } from './typeorm-interview-docs.entity';

export class InterviewDocsBuilder extends BaseBuilder<TypeormInterviewDocsEntity> {
	constructor() {
		super(TypeormInterviewDocsEntity);
	}

	setId(id: string): InterviewDocsBuilder {
		this.instance.id = id;
		return this;
	}

	setUserId(userId: string): InterviewDocsBuilder {
		this.instance.userId = userId;
		return this;
	}

	setVideoUrl(videoUrl: string): InterviewDocsBuilder {
		this.instance.videoUrl = videoUrl;
		return this;
	}

	setVideoPlayTime(videoPlayTime: number): InterviewDocsBuilder {
		this.instance.videoPlayTime = videoPlayTime;
		return this;
	}

	setRoomUUID(roomUUID: string): InterviewDocsBuilder {
		this.instance.roomUUID = roomUUID;
		return this;
	}
}
