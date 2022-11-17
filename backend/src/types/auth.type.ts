export interface UserSocialInfo {
	id: string;
	oauthType: string;
}

export interface UserLocalInfo {
	id: string;
	password: string;
	email: string;
}

export class UserInfo {
	id: string;
	password: string;
	email: string;
	oauthType: string;
	nickname: string;
}

export interface Payload {
	nickname: string;
	email: string;
	iat: number;
	exp: number;
}
