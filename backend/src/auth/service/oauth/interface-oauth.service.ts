import { UserSocialInfo } from 'src/types/auth.type';

export interface OauthService {
	/**
	 * 해당하는 oauth type에 따른 authorization page url을 반환합니다.
	 */
	getSocialUrl(): string;

	/**
	 * social login을 승인 시 반환되는 authorization code를 전달하여 access token을 받아서 반환합니다.
	 * @param authorizationCode social login으로 얻은 authorization code
	 * @returns accessToken - social 인증으로 얻은 accessToken
	 */
	getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string>;

	/**
	 * accessToken으로 해당 social에 profile 조회 api를 통해 user 정보를 얻어 반환합니다.
	 * @param accessToken
	 * @returns userInfo
	 */
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialInfo>;
}
