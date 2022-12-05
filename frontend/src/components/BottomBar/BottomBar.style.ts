import { css } from '@emotion/react';

export const bottomBarStyle = (theme) => css`
	position: fixed;
	bottom: 0;
	background-color: ${theme.colors.black};
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
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
		display: ${isOpen ? 'flex' : 'none'};
		flex-direction: column;
		position: absolute;
		right: 0px;
		top: 0px;

		box-sizing: border-box;
		padding: 30px 25px;
		width: 412px;
		height: calc(100% - 70px);
		background-color: ${theme.colors.black};

		opacity: 0.85;
	`;

export const drawerHeaderStyle = css`
	display: flex;
	justify-content: space-between;
	color: white;
	font-weight: 400;
	font-size: 24px;
`;
