import { css } from '@emotion/react';

export const userListStyle = css`
	display: flex;
	flex-direction: column;
	color: white;
	padding: 20px 0px;
	gap: 15px;
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		div {
			display: flex;
            gap: 10px;
		}
	}
`;

export const drawerBottomBoxStyle = css`
	position: absolute;
	bottom: 0;
`;

export const dividerStyle = (theme) => css`
	height: 1px;
	width: 100%;
	background-color: ${theme.colors.gray3};
`;

export const roomUUIDStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: white;
	height: 60px;
`;
