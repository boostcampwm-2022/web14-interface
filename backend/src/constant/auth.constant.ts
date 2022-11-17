export const USER_REPOSITORY_INTERFACE = 'UserRepository';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const MAX_AGE = 2592000;

// OAUTH
export enum OAUTH_TYPE {
	NAVER = 'naver',
	KAKAO = 'kakao',
}

export const OAUTH_CALLBACK_URL = 'api/auth/oauth/callback';
export const AUTHORIZATION_TOKEN_TYPE = 'Bearer';

// NAVER
export const NAVER_AUTHORIZE_PAGE_URL = 'https://nid.naver.com/oauth2.0/authorize';
export const NAVER_ACCESS_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
export const NAVER_PROFILE_API_URL = 'https://openapi.naver.com/v1/nid/me';

// KAKAO
export const KAKAO_AUTHORIZE_PAGE_URL = 'https://kauth.kakao.com/oauth/authorize';
export const KAKAO_ACCESS_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
export const KAKAO_PROFILE_API_URL = 'https://kapi.kakao.com/v2/user/me';

// JWT
export enum JWT_VALUE {
	JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET',
	JWT_ACCESS_TOKEN_EXPIRATION_TIME = 'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
	JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET',
	JWT_REFRESH_TOKEN_EXPIRATION_TIME = 'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
}

export const tokenCookieOptions = {
	httpOnly: true,
	maxAge: MAX_AGE,
} as const;
