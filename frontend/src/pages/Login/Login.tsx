import React from 'react';
import axios from 'axios';
import { OAUTH_TYPE } from '@constants/oauth.constant';

import Button from '@components/@shared/Button/Button';
import { ReactComponent as InterfaceSyncPreview } from '@assets/preview_sync.svg';
import { ReactComponent as Logo } from '@assets/logo_white.svg';
import { ReactComponent as NaverIcon } from '@assets/icon/naver.svg';
import { ReactComponent as KakaoIcon } from '@assets/icon/kakao.svg';

import { LoginButtonAreaStyle, LoginWrapper, logoStyle, previewStyle } from './Login.style';
import { flexColumn } from '@styles/globalStyle';

const Login = () => {
	const startOauth = async (type: string) => {
		// TODO 응답, 처리 hook으로 빼기
		const res = await axios
			.get(`/api/auth/oauth/redirect/${type}`)
			.then((res) => res.data)
			.catch((err) => err.response);

		location.href = res.data.url;
	};

	return (
		<>
			<div css={LoginWrapper}>
				<InterfaceSyncPreview css={previewStyle} />
				<div css={flexColumn({ gap: '32px' })}>
					<div css={flexColumn({ gap: '16px' })}>
						<Logo css={logoStyle} />
						<span>실시간 면접 피드백 플랫폼</span>
					</div>
					<div css={LoginButtonAreaStyle}>
						<Button
							width="100%"
							color={'secondary'}
							justifyContent={'space-between'}
							iconColor={false}
							onClick={() => startOauth(OAUTH_TYPE.NAVER)}
						>
							<NaverIcon />
							<span>네이버로 시작하기</span>
							<br />
						</Button>
						<Button
							width="100%"
							color={'secondary'}
							justifyContent={'space-between'}
							iconColor={false}
							onClick={() => startOauth(OAUTH_TYPE.KAKAO)}
						>
							<KakaoIcon />
							<span>카카오로 시작하기</span>
							<br />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
