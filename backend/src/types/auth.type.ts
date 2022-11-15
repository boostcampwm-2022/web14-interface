export interface UserSocialDto {
	id: string;
	email?: string;
	password?: string;
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
}
