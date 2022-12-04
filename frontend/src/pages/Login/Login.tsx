import React from 'react';

import { ReactComponent as InterfacePreview } from '@assets/preview.svg';
import { ReactComponent as Logo } from '@assets/logo_white.svg';
import { ReactComponent as NaverIcon } from '@assets/icon/naver.svg';
import { ReactComponent as KakaoIcon } from '@assets/icon/kakao.svg';
import { css } from '@emotion/react';
import axios from 'axios';
import { OAUTH_TYPE } from '@constants/oauth.constant';

const Login = () => {
	const startOauth = async (type: string) => {
		// TODO 응답, 처리 hook으로 빼기
		console.log('hello');
		const res = await axios
			.get(`/api/auth/oauth/redirect/${type}`)
			.then((res) => res.data)
			.catch((err) => err.response);

		location.href = res.data.url;
	};

	return (
		<>
			<div css={LoginWrapper}>
				<div>
					<InterfacePreview css={previewStyle} />
				</div>
				<div css={flexColumn}>
					<div css={flexColumn}>
						<Logo css={logoStyle} />
						<span>실시간 면접 피드백 플랫폼</span>
					</div>
					<div css={flexColumn}>
						<button css={OauthButton} onClick={() => startOauth(OAUTH_TYPE.NAVER)}>
							<NaverIcon css={OauthIconStyle} />
							네이버로 시작하기
						</button>
						<button css={OauthButton} onClick={() => startOauth(OAUTH_TYPE.KAKAO)}>
							<KakaoIcon css={OauthIconStyle} />
							카카오로 시작하기
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

const LoginWrapper = (theme) => css`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
	background: ${theme.colors.primary3};

	gap: 64px;
	color: ${theme.colors.white};
`;

const previewStyle = css`
	width: 560px;
`;

const logoStyle = css`
	width: 320px;
`;

const flexColumn = (theme) => css`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const OauthButton = (theme) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;

	width: 100%;
	background-color: ${theme.colors.primary2};

	font-size: 20px;
	font-weight: bold;

	border: 2px solid ${theme.colors.gray3};
	border-radius: 8px;
`;

const OauthIconStyle = (theme) => css`
	width: 24px;

	border-radius: 8px;
	overflow: hidden;
`;

export default Login;
