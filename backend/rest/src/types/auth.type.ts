export interface UserSocialInfo {
	id: string;
	oauthType: string;
}

export interface UserLocalInfo {
	id: string;
	password: string;
	email: string;
}

export interface UserInfo extends UserSocialInfo, UserLocalInfo {
	nickname: string;
}

export interface JwtPayload {
	id: string;
	email: string;
	iat: number;
	exp: number;
}
