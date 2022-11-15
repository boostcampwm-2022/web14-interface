import { UserSocialDto } from 'src/types/auth.type';
import { OauthService } from './oauth.service.interface';

export class OauthGoogleService implements OauthService {
	getSocialUrl(): string {
		throw new Error('Method not implemented.');
	}
	getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string> {
		throw new Error('Method not implemented.');
	}
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialDto> {
		throw new Error('Method not implemented.');
	}
}
