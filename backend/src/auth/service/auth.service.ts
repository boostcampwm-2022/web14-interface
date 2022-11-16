import { OAUTH_TYPE, USER_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { UserInfo } from 'src/types/auth.type';
import { UserEntity } from 'src/user/entities/typeorm-user.entity';
import { UserRepository } from 'src/user/repository/interface-user.repository';
import { OauthGoogleService } from './oauth/google-oauth.service';
import { OauthNaverService } from './oauth/naver-oauth.service';
import { OauthService } from './oauth/interface-oauth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	private oauthInstance: OauthService;

	constructor(
		@Inject(USER_REPOSITORY_INTERFACE)
		private readonly userRepository: UserRepository<UserEntity>,

		private readonly oauthGoogleService: OauthGoogleService,
		private readonly oauthNaverService: OauthNaverService,

		private jwtService: JwtService
	) {}

	/**
	 * oauth type에 따라 해당되는 oauth page url을 반환합니다.
	 * @param type oauth type (naver, google etc...)
	 * @returns oauth type에 따른 social authentication page url
	 */
	getSocialUrl(type: string): string {
		this.setOauthInstanceByType(type);

		return this.oauthInstance.getSocialUrl();
	}

	/**
	 * oauth type과 사용자의 social 로그인으로 획득한 authorization code를 기반으로
	 * user info를 얻은 후, 가입이 되어있지 않다면 회원 가입을 합니다.
	 * @param type 해당 social oauth 이름
	 * @param authorizationCode 해당 social oauth의 인증으로 얻은 authorizationCode
	 * @returns 가입 된 user의 id
	 */
	async socialStart({ type, authorizationCode }: { type: string; authorizationCode: string }) {
		this.setOauthInstanceByType(type);

		const accessToken = await this.oauthInstance.getAccessTokenByAuthorizationCode(
			authorizationCode
		);
		const userSocialInfo = await this.oauthInstance.getSocialInfoByAccessToken(accessToken);

		const user = await this.userRepository.saveUser(userSocialInfo as UserInfo);
		return user;
	}

	async login(user: UserEntity) {
		const payload = { id: user.id, oauthType: user.oauthType };
		return {
			accessToken: this.jwtService.sign(payload),
		}
	}

	/**
	 * oauthInstance 인터페이스에 type에 따라 oauth 구현체를 할당합니다.
	 * @param type 해당 social oauth 이름
	 */
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
