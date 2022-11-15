export interface UserSocialInfo {
	id: string;
	oauthType: string;
}

export interface UserLocalInfo {
	id: string;
	password: string;
	email: string;
}

export interface UserInfo {
	id: string;
	password: string;
	email: string;
	oauthType: string;
	nickname: string;
}
