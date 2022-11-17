import {
	KAKAO_ACCESS_TOKEN_URL,
	KAKAO_AUTHORIZE_PAGE_URL,
	OAUTH_CALLBACK_URL,
	OAUTH_TYPE,
} from '@constant';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserSocialInfo } from 'src/types/auth.type';
import { OauthService } from './interface-oauth.service';

@Injectable()
export class OauthKakaoService implements OauthService {
	private clientId = process.env.KAKAO_CLIENT_ID;
	private clientSecret = process.env.KAKAO_CLIENT_SECRET;
	private callbackUrl = [
		process.env.SERVER_ORIGIN_URL,
		OAUTH_CALLBACK_URL,
		OAUTH_TYPE.KAKAO,
	].join('/');

	getSocialUrl(): string {
		const queryString = `?response_type=code&client_id=${this.clientId}&redirect_uri=${this.callbackUrl}`;
		return KAKAO_AUTHORIZE_PAGE_URL + queryString;
	}

	async getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<string> {
		const queryString =
			`?grant_type=authorization_code` +
			`&client_id=${this.clientId}&client_secret=${this.clientSecret}` +
			`&redirect_uri=${this.callbackUrl}&code=${authorizationCode}`;

		const { access_token } = await axios
			.get(KAKAO_ACCESS_TOKEN_URL + queryString)
			.then((res) => res.data);
		console.log(access_token);
		return access_token;
	}
	getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialInfo> {
		throw new Error('Method not implemented.');
	}
}
