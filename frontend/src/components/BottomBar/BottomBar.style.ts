import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const bottomBarStyle = (theme) => css`
	${flexRow({ justifyContent: 'space-between' })}

	position: fixed;
	bottom: 0;

	width: 100%;
	height: 64px;
	background-color: ${theme.colors.black};
	padding: 0px 12px;

	border-top: 1px solid ${theme.colors.gray1};
`;

export const iconGroupStyle = css`
	${flexRow({ gap: '8px' })}
`;

export const horzLineStyle = (theme) => css`
	width: 1px;
	height: 24px;
	background-color: ${theme.colors.gray3};
`;

export const drawerStyle = (isOpen) => (theme) =>
	css`
		display: ${isOpen ? 'flex' : 'none'};

		flex-direction: column;
		position: absolute;
		right: 0px;
		top: 0px;

		padding: 12px 24px;
		width: 344px;
		height: calc(100% - 64px);
		background-color: ${theme.colors.black};

		opacity: 0.85;
	`;

export const drawerHeaderStyle = css`
	${flexRow({ justifyContent: 'space-between' })}

	color: white;
	font-weight: 400;
	font-size: 24px;
`;
