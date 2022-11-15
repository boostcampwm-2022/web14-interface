import { OAUTH_TYPE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.interface.repository';
import { OauthGoogleService } from './oauth/oauth.google.service';
import { OauthNaverService } from './oauth/oauth.naver.service';
import { OauthService } from './oauth/oauth.service.interface';

@Injectable()
export class AuthService {
	private oauthInstance: OauthService;

	constructor(
		@Inject('UserRepository')
		private readonly userRepository: UserRepository<UserEntity>,
		private readonly oauthGoogleService: OauthGoogleService,
		private readonly oauthNaverService: OauthNaverService
	) {}

	getSocialUrl(type: string) {
		this.setOauthInstanceByType(type);

		return this.oauthInstance.getSocialUrl();
	}

	async socialJoin({ type, authorizationCode }: { type: string; authorizationCode: string }) {
		this.setOauthInstanceByType(type);

		const accessToken = await this.oauthInstance.getAccessTokenByAuthorizationCode(
			authorizationCode
		);

		const userSocialInfo = await this.oauthInstance.getSocialInfoByAccessToken(accessToken);

		// userLocalInfo, userSocialInfo -> UserInfo-> UserEntity, moongoose
	}

	setOauthInstanceByType(type: string) {
		switch (type) {
			case OAUTH_TYPE.NAVER:
				this.oauthInstance = this.oauthNaverService;
				break;
			case OAUTH_TYPE.GOOGLE:
				this.oauthInstance = this.oauthGoogleService;
				break;
			default:
				throw new Error();
		}
	}
}
