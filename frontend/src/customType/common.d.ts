export interface FeedbackType {
	id: number;
	content: string;
	startTime: number;
	endTime: number;
}

export interface EditableFeedbackType extends FeedbackType {
	readOnly: boolean;
}
