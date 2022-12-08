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
	createdAt: Date;
	playTime: number;
	feedbacks: namedFeedback;
}

interface namedFeedback {
	nickname: string;
	feedbackList: FeedbackType[];
}

export interface DocsItemDtoType {
	docsUUID: string;
	createdAt: Date;
	playTime: number;
}

export interface FeedbackDtoType {
	docsUUID: string;
	userUUID: string;
	feedbackList: FeedbackType[];
}
