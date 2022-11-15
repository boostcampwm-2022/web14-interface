import { OAUTH_TYPE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/types/auth.type';
import { UserEntity } from 'src/user/entities/typeorm-user.entity';
import { UserRepository } from 'src/user/repository/interface-user.repository';
import { EntityRepository, Repository } from 'typeorm';
import { OauthGoogleService } from './oauth/google-oauth.service';
import { OauthNaverService } from './oauth/naver-oauth.service';
import { OauthService } from './oauth/interface-oauth.service';

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

		// const accessToken = await this.oauthInstance.getAccessTokenByAuthorizationCode(
		// 	authorizationCode
		// );
		// const userSocialInfo = await this.oauthInstance.getSocialInfoByAccessToken(accessToken);
		const userSocialInfo = { id: '1234', oauthType: type, email: '1234' };

		console.log(__dirname);

		const userId = await this.userRepository.saveUser(userSocialInfo as UserInfo);
		return userId;
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
