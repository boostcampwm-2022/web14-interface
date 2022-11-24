/*  */
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { PHASE_TYPE } from '@constants/phase.constant';
import { authState } from '@store/auth.atom';
import useSafeNavigate from '@hooks/useSafeNavigate';

import { ReactComponent as InterfacePreview } from '@assets/icon/interface_preview.svg';
import { ReactComponent as InterfaceLogo } from '@assets/icon/interface_logo.svg';
import { css } from '@emotion/react';

const Login = () => {
	const { safeNavigate } = useSafeNavigate();
	const authSetter = useSetRecoilState(authState);

	const handleLogin = () => {
		safeNavigate(PHASE_TYPE.LANDING_PHASE);
		authSetter(true);
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
						<button onClick={handleLogin} css={OauthButton}>
							<div> Naver </div>
						</button>
						<button onClick={handleLogin} css={OauthButton}>
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
