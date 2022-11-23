/*  */
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { PHASE_TYPE } from '@constants/phase.constant';
import { authState } from '@store/auth.atom';
import useSafeNavigate from '@hooks/useSafeNavigate';

const Login = () => {
	const { safeNavigate } = useSafeNavigate();
	const authSetter = useSetRecoilState(authState);
	const handleLogin = () => {
		safeNavigate(PHASE_TYPE.LANDING_PHASE);
		authSetter(true);
	};
	return (
		<>
			<div>Login Page</div>
			<button onClick={handleLogin}>로그인</button>
		</>
	);
};

export default Login;
