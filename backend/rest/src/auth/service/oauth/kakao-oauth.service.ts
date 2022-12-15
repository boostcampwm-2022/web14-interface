import {
	AUTHORIZATION_TOKEN_TYPE,
	KAKAO_ACCESS_TOKEN_URL,
	KAKAO_AUTHORIZE_PAGE_URL,
	KAKAO_CLIENT_ID,
	KAKAO_PROFILE_API_URL,
	OAUTH_CALLBACK_URL,
	OAUTH_TYPE,
} from '@constant';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserSocialInfo } from '@types';
import { OauthService } from './interface-oauth.service';
import { ConfigService } from '@nestjs/config';
import { KAKAO_CLIENT_SECRET } from 'src/constant/env.constant';

@Injectable()
export class OauthKakaoService implements OauthService {
	constructor(private readonly configService: ConfigService) {}

	private clientId = KAKAO_CLIENT_ID;
	private clientSecret = this.configService.get(KAKAO_CLIENT_SECRET);
	private callbackUrl = [
		process.env.CLIENT_ORIGIN_URL,
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

		return access_token;
	}

	/**
	 * @link https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
	 * @param accessToken
	 * @returns userInfo
	 */
	async getSocialInfoByAccessToken(accessToken: string): Promise<UserSocialInfo> {
		const headers = { Authorization: `${AUTHORIZATION_TOKEN_TYPE} ${accessToken}` };
		const res = await axios.get(KAKAO_PROFILE_API_URL, { headers }).then((res) => res.data);

		const user = res['kakao_account'] as UserSocialInfo;
		user.id = `${res.id}`;
		user.oauthType = OAUTH_TYPE.KAKAO;
		return user;
	}
}
