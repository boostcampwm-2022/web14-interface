import { GOOGLE_AUTHORIZE_PAGE_URL, OAUTH_CALLBACK_URL, OAUTH_TYPE } from '@constant';
import { Injectable } from '@nestjs/common';
import { UserSocialInfo } from 'src/types/auth.type';
import { OauthService } from './interface-oauth.service';

@Injectable()
export class OauthGoogleService implements OauthService {
	private clientId = process.env.GOGGLE_CLIENT_ID;
	private clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	private callbackUrl = [
		process.env.SERVER_ORIGIN_URL,
		OAUTH_CALLBACK_URL,
		OAUTH_TYPE.GOOGLE,
	].join('/');

	getSocialUrl(): string {
		const queryString = `?response_type=token&client_id=${this.clientId}&redirect_uri=${this.callbackUrl}`;
		return GOOGLE_AUTHORIZE_PAGE_URL + queryString;
	}
	getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string> {
		throw new Error('Method not implemented.');
	}
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialInfo> {
		throw new Error('Method not implemented.');
	}
}
