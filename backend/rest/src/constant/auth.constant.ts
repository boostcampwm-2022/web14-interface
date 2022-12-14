import { CookieOptions } from 'express';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from './env.constant';

export const USER_REPOSITORY_INTERFACE = 'UserRepository';
export const MAX_AGE = 60 * 60 * 24 * 30 * 1000;

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
export const NAVER_CLIENT_ID = 'eSJrVQDHuXZHhx0A0VqC';

// KAKAO
export const KAKAO_AUTHORIZE_PAGE_URL = 'https://kauth.kakao.com/oauth/authorize';
export const KAKAO_ACCESS_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
export const KAKAO_PROFILE_API_URL = 'https://kapi.kakao.com/v2/user/me';
export const KAKAO_CLIENT_ID = 'bc9b6bd6439f128d5ee02f0f3cccec69';

// JWT
export enum JWT_TYPE {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken',
}

export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = 60 * 5;

export const accessTokenOptions = {
	secret: JWT_ACCESS_TOKEN_SECRET,
	expirationTime: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
};

export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 14;

export const refreshTokenOptions = {
	secret: JWT_REFRESH_TOKEN_SECRET,
	expirationTime: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};

export const tokenCookieOptions: CookieOptions = {
	httpOnly: true,
	maxAge: MAX_AGE,
	secure: true,
} as const;
