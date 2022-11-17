export const USER_REPOSITORY_INTERFACE = 'UserRepository';
export const JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET';
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = 'JWT_ACCESS_TOKEN_EXPIRATION_TIME';
export const JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET';
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = 'JWT_REFRESH_TOKEN_EXPIRATION_TIME';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const MAX_AGE = 2592000;

export enum OAUTH_TYPE {
	NAVER = 'naver',
	GOOGLE = 'google',
}

export const tokenCookieOptions = {
	httpOnly: true,
	maxAge: MAX_AGE,
} as const;
