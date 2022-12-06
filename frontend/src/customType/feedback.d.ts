export interface FeedbackType {
	startTime: number;
	innerIndex: number;
	content: string;
}

export interface EditableFeedbackType extends FeedbackType {
	readOnly: boolean;
}

export interface FeedbackDTO {
	docsUUID: string;
	feedbackList: FeedbackType[];
}

