import { UserSocialDto } from 'src/types/auth.type';

export interface OauthService {
	getSocialUrl(): string;
	getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string>;
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialDto>;
}
