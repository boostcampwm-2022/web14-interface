import { UserSocialInfo } from 'src/types/auth.type';
import { OauthService } from './oauth.service.interface';

export class OauthNaverService implements OauthService {
	getSocialUrl(): string {
		throw new Error('Method not implemented.');
	}
	getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string> {
		throw new Error('Method not implemented.');
	}
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialInfo> {
		throw new Error('Method not implemented.');
	}
}
