import React from 'react';
import { css } from '@emotion/react';
import { toastState } from '@store/toast.store';
import { useSetRecoilState } from 'recoil';

export enum TOAST_TYPE {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	NORMAL = 'NORMAL',
}

const TOAST_TIME = 3;

const useToast = () => {
	const setToast = useSetRecoilState(toastState);

	const makeToast = (message: string, type: TOAST_TYPE) => (
		<div css={(theme) => toastStyle(theme, type)}>{message}</div>
	);

	const popToast = (message: string, type: TOAST_TYPE = TOAST_TYPE.NORMAL) => {
		const newToast = makeToast(message, type);
		setToast(newToast);
		setTimeout(() => setToast(null), TOAST_TIME * 1000);
	};

	return { popToast };
};

export default useToast;

const toastStyle = (theme, type) => css`
	position: absolute;
	bottom: 72px;
	left: 50%;
	transform: translateX(-50%);

	box-shadow: 0px 5px 24px ${theme.colors.black + 55};

	padding: 12px 24px;
	background-color: ${type === TOAST_TYPE.SUCCESS
		? theme.colors.primary
		: type === TOAST_TYPE.ERROR
		? theme.colors.red
		: theme.colors.secondary};
	color: ${type === TOAST_TYPE.NORMAL ? theme.colors.tertiary : theme.colors.white};

	border-radius: ${theme.borderRadius};

	animation-name: toastFade;
	animation-duration: ${TOAST_TIME}s;
	animation-direction: alternate;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;

	@keyframes toastFade {
		0% {
			opacity: 0;
			bottom: calc(${theme.bottomBarHeight} + 12px);
		}
		5%,
		95% {
			opacity: 1;
			bottom: calc(${theme.bottomBarHeight} + 24px);
		}
		100% {
			opacity: 0;
			bottom: calc(${theme.bottomBarHeight} + 12px);
		}
	}
`;
