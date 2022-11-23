export interface FeedbackType {
	content: string[];
	startTime: number;
	endTime?: number;
	readOnly?: boolean[];
}

export interface EditableFeedbackType extends FeedbackType {
	readOnly: boolean;
}
