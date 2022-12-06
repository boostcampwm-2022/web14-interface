import { FeedbackType } from './feedback';

export interface UserDtoType {
	uuid: string;
	nickname: string;
	role: string;
	roomUUID: string;
}

export interface DocsReqDtoType {
	docsUUID: string;
	videoPlayTime: number;
}

export interface DocsResDtoType {
	docsUUID: string;
	userUUID: string;
	feedbackList: FeedbackType[];
}
