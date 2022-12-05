import { css } from '@emotion/react';

export const logoStyle = () => css`
	width: 120px;
`;

export const plusIconStyle = () => css`
	width: 24px;
	height: 24px;

	filter: invert(1);
`;

export const folderIconStyle = () => css`
	width: 16px;
	height: 16px;

	filter: invert(1);
`;

export const previewStyle = () => css`
	width: 560px;
	height: 320px;

	padding-top: 32px;
`;

export const landingWrapperStyle = (theme) => css`
	display: flex;
	flex-direction: column;
	gap: 64px;

	width: 100%;
	height: 100%;
	//TODO 화면 줄어들 경우 밑에 안 채워지는 문제 수정
	background: linear-gradient(
		to bottom,
		${theme.colors.offWhite} 0%,
		${theme.colors.offWhite} 448px,
		${theme.colors.primary3} 448px,
		${theme.colors.primary3} 100%
	);
`;

export const headerStyle = () => css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	padding: 24px 32px;
`;

export const mainStyle = () => css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;

	span {
		font-size: 40px;
	}
`;

export const MediumBtn = () => css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;

	font-size: 16px;
	padding: 8px 16px;

	border-radius: 8px;
`;

export const LargeBtn = () => css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;

	padding: 12px 20px;

	border-radius: 8px;

	font-size: 20px;
	line-height: 20px;
`;

export const headerBtnGroupStyle = () => css`
	display: flex;
	gap: 8px;
`;

export const mainBtnGroupStyle = () => css`
	display: flex;
	gap: 16px;
`;

export const primaryBtn = (theme) => css`
	background-color: ${theme.colors.primary};
	color: ${theme.colors.white};
`;

export const secondaryBtn = (theme) => css`
	background-color: ${theme.colors.primary2};
	border: 1px solid ${theme.colors.gray3};
`;

export const historyBtn = (theme) => css`
	background-color: ${theme.colors.primary3};
	color: white;
`;

export const logoutBtn = (theme) => css`
	background-color: ${theme.colors.red};
	color: white;
`;
