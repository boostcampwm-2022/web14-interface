export const USER_REPOSITORY_INTERFACE = 'UserRepository' as const;

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
