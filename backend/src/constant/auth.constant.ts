export const USER_REPOSITORY_INTERFACE = 'UserRepository' as const;
export const JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET' as const;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = 'JWT_ACCESS_TOKEN_EXPIRATION_TIME' as const;
export const JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET' as const;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = 'JWT_REFRESH_TOKEN_EXPIRATION_TIME' as const;
export const ACCESS_TOKEN = 'accessToken' as const;
export const REFRESH_TOKEN = 'refreshToken' as const;

export enum OAUTH_TYPE {
	NAVER = 'naver',
	GOOGLE = 'google',
}
