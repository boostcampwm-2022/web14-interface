export interface FeedbackType {
	startTime: number;
	innerIndex: number;
	content: string;
	readOnly?: boolean;
}

export interface EditableFeedbackType extends FeedbackType {
	readOnly: boolean;
}
