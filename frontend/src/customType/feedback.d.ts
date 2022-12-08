export interface FeedbackType {
	id: string;
	startTime: number;
	innerIndex: number;
	content: string;
}

export interface EditableFeedbackType extends FeedbackType {
	readOnly: boolean;
}

export interface FeedbackItemType extends EditableFeedbackType {
	isFirst: boolean;
}
