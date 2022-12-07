export interface InterviewDocs<T> {
	id: string;
	userId: string;
	videoUrl: string;
	videoPlayTime: number;
	createdAt: Date;
	updatedAt: Date;
	isDeleted: boolean;
	feedbackList: T[];
}
