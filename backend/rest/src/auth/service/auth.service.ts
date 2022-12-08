import {
	accessTokenOptions,
	HTTP_ERROR_MSG,
	OAUTH_TYPE,
	refreshTokenOptions,
	USER_REPOSITORY_INTERFACE,
} from '@constant';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserInfo } from '@types';
import { UserRepository } from 'src/user/repository/user.repository';
import { OauthNaverService } from './oauth/naver-oauth.service';
import { OauthService } from './oauth/interface-oauth.service';
import { OauthKakaoService } from './oauth/kakao-oauth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateJwtPayloadDto } from '../dto/create-jwt.dto';
import { JwtPayloadBuiler } from 'src/auth/dto/create-jwt.builder';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
	private oauthInstance: OauthService;

	constructor(
		@Inject(USER_REPOSITORY_INTERFACE)
		private readonly userRepository: UserRepository<UserEntity>,

		private readonly oauthKakaoService: OauthKakaoService,
		private readonly oauthNaverService: OauthNaverService,

		private jwtService: JwtService,
		private configService: ConfigService
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

	/**
	 * 비밀키와 만료 시간을 기반으로 access token 또는 refresh token을 발급합니다.
	 * @param payload jwt payload에 입력될 값
	 * @param secret 서명에 사용될 비밀키
	 * @param expirationTime token의 만료시간
	 * @returns access token 또는 refresh token
	 */
	createJwt({
		payload,
		secret,
		expirationTime,
	}: {
		payload: CreateJwtPayloadDto;
		secret: string;
		expirationTime: string;
	}) {
		const token = this.jwtService.sign(
			{ ...payload },
			{
				secret: this.configService.get(secret),
				expiresIn: `${this.configService.get(expirationTime)}s`,
			}
		);

		return token;
	}

	/**
	 * user info로 access token과 refresh token을 반환합니다.
	 * @param user UserInfo
	 * @returns {} { accessToken, refreshToken }
	 */
	createAccessTokenAndRefreshToken(user: UserInfo) {
		const { id, email } = user;

		const payload = new JwtPayloadBuiler().setId(id).setEmail(email).build();

		const accessToken = this.createJwt({ payload, ...accessTokenOptions });
		const refreshToken = this.createJwt({ payload, ...refreshTokenOptions });
		return { accessToken, refreshToken };
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
			case OAUTH_TYPE.KAKAO:
				this.oauthInstance = this.oauthKakaoService;
				break;
			default:
				throw new BadRequestException(HTTP_ERROR_MSG.UNKNOWN_OAUTH_TYPE_ERROR);
		}
	}
}
