import { NAVER_ACCESS_TOKEN_URL, NAVER_AUTHORIZE_PAGE_URL, OAUTH_TYPE } from '@constant';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserSocialInfo } from 'src/types/auth.type';
import { OauthService } from './interface-oauth.service';

@Injectable()
export class OauthNaverService implements OauthService {
	private clientId = process.env.NAVER_CLIENT_ID;
	private clientSecret = process.env.NAVER_CLIENT_SECRET;
	private callbackUrl = [
		process.env.SERVER_URL,
		process.env.NAVER_CALLBACK_URL,
		OAUTH_TYPE.NAVER,
	].join('/');

	getSocialUrl(): string {
		const queryString = `&client_id=${this.clientId}&redirect_uri=${this.callbackUrl}`;
		return NAVER_AUTHORIZE_PAGE_URL + queryString;
	}

	async getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string> {}
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialInfo> {
		throw new Error('Method not implemented.');
	}
}
