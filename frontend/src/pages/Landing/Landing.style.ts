import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const logoStyle = () => css`
	width: 120px;
`;

export const previewStyle = () => css`
	height: 300px;
`;

export const landingWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;

	text-align: center;
`;

export const headerStyle = () => css`
	${flexRow({ justifyContent: 'space-between' })};

	width: 100%;

	padding: 16px 24px;
`;

export const mainStyle = (theme) => css`
	${flexColumn({ gap: '32px', justifyContent: 'space-around' })};

	height: calc(100% - 72px);

	padding: 24px;

	//TODO 화면 줄어들 경우 밑에 안 채워지는 문제 수정
	background: linear-gradient(
		to bottom,
		${theme.colors.white} 0%,
		${theme.colors.white} 65%,
		${theme.colors.tertiary} 65%,
		${theme.colors.tertiary} 100%
	);
`;

export const historyBtn = (theme) => css`
	background-color: ${theme.colors.tertiary};
	color: white;
`;

export const logoutBtn = (theme) => css`
	background-color: ${theme.colors.red};
	color: white;
`;

export const introTextStyle = (theme) => css`
	color: ${theme.colors.black};
	font-size: 48px;
	font-weight: bold;
`;
