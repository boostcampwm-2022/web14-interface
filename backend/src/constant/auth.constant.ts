export const USER_REPOSITORY_INTERFACE = 'UserRepository' as const;

// OAUTH
export enum OAUTH_TYPE {
	NAVER = 'naver',
	GOOGLE = 'google',
}
export const OAUTH_CALLBACK_URL = 'api/auth/oauth/callback';

// NAVER
export const NAVER_AUTHORIZE_PAGE_URL =
	'https://nid.naver.com/oauth2.0/authorize?response_type=code';
export const NAVER_ACCESS_TOKEN_URL =
	'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code';
export const NAVER_PROFILE_API_URL = 'https://openapi.naver.com/v1/nid/me';
