import { FeedbackType } from './feedback';

export interface UserDtoType {
	uuid: string;
	nickname: string;
	role: string;
	roomUUID: string;
}

export interface DocsReqDtoType {
	docsUUID: string;
	roomUUID: string;
	videoPlayTime: number;
}

export interface DocsResDtoType {
	docsUUID: string;
	createdAt: string;
	videoUrl: string;
	videoPlayTime: number;
	feedbacks: namedFeedback[];
}

interface namedFeedback {
	nickname: string;
	feedbackList: FeedbackType[];
}

export interface DocsItemDtoType {
	id: string;
	createdAt: string;
	videoPlayTime: number;
}

export interface FeedbackDtoType {
	docsUUID: string;
	feedbackList: FeedbackType[];
}
