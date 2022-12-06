import { BaseBuilder } from '../../common/base.builder';
import { TypeormFeedbackEntity } from './typeorm-feedback.entity';
import { TypeormInterviewDocsEntity } from './typeorm-interview-docs.entity';

export class FeedbackBuilder extends BaseBuilder<TypeormFeedbackEntity> {
	constructor() {
		super(TypeormFeedbackEntity);
	}

	setUserId(userId: string): FeedbackBuilder {
		this.instance.userId = userId;
		return this;
	}

	setDocs(docs: TypeormInterviewDocsEntity): FeedbackBuilder {
		this.instance.docs = docs;
		return this;
	}

	setStartTime(startTime: number): FeedbackBuilder {
		this.instance.startTime = startTime;
		return this;
	}

	setInnerIndex(innerIndex: number): FeedbackBuilder {
		this.instance.innerIndex = innerIndex;
		return this;
	}

	setContent(content: string): FeedbackBuilder {
		this.instance.content = content;
		return this;
	}
}
