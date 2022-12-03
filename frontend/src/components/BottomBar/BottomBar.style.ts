import { css } from '@emotion/react';

export const bottomBarStyle = (theme) => css`
	position: fixed;
	bottom: 0;
	background-color: ${theme.colors.titleActive};
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 100px;
	padding: 0px 30px;
`;

export const iconGroupStyle = css`
	display: flex;
	gap: 20px;
`;

export const horzLineStyle = (theme) => css`
	width: 1px;
	height: 44px;
	background-color: ${theme.colors.gray3};
`;

export const drawerStyle = (isOpen) => (theme) =>
	css`
		display: ${isOpen ? 'display' : 'none'};
		flex-direction: column;
		position: absolute;
		right: 0px;
		top: 0px;

		box-sizing: border-box;
		padding: 30px 25px;
		width: 412px;
		height: calc(100% - 100px);
		background-color: ${theme.colors.titleActive};
	`;

export const drawerHeaderStyle = css`
	display: flex;
	justify-content: space-between;
	color: white;
	font-weight: 400;
	font-size: 24px;
`;
