/*  */
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { PHASE_TYPE } from '@constants/phase.constant';
import { authState } from '@store/auth.atom';
import useSafeNavigate from '@hooks/useSafeNavigate';

import { ReactComponent as InterfacePreview } from '@assets/icon/interface_preview.svg';
import { ReactComponent as InterfaceLogo } from '@assets/icon/interface_logo.svg';
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect } from 'react';

enum OAUTH_TYPE {
	NAVER = 'naver',
	KAKAO = 'kakao',
}

const Login = () => {
	const { safeNavigate } = useSafeNavigate();
	const authSetter = useSetRecoilState(authState);

	useEffect(() => {
		(async () => {
			// TODO 응답, 처리 hook으로 빼기
			const res = await axios
				.get('/api/auth/login')
				.then((res) => res.data)
				.catch((err) => err.response);

			// TODO server에서 응답, 오류 구조화
			if (res.statusCode === 200) {
				safeNavigate(PHASE_TYPE.LANDING_PHASE);
				authSetter(true);
			}
		})();
	}, []);

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
			<div css={loginContainer}>
				<InterfacePreview css={{ width: '40vw' }} />
				<div css={{ display: 'flex', flexDirection: 'column', gap: '6vh' }}>
					<div css={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
						<InterfaceLogo css={{ width: '20vw', filter: 'invert(100%)' }} />
						<div css={{ fontSize: '1.2rem' }}> 실시간 면접 피드백 플랫폼 </div>
					</div>
					<div css={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
						<button onClick={() => startOauth(OAUTH_TYPE.NAVER)} css={OauthButton}>
							<div> Naver </div>
						</button>
						<button onClick={() => startOauth(OAUTH_TYPE.KAKAO)} css={OauthButton}>
							<div> Kakao </div>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

const loginContainer = css`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #030d45;
	gap: 6vw;
	color: white;
`;

const OauthButton = css`
	width: 15vw;
	height: 5vh;
	border-radius: 10px;
	background: white;
	font-size: 1.2em;
`;

export default Login;
