export interface UserSocialDto {
	id: string;
	oauthType: string;
}

export interface UserLocalDto {
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
