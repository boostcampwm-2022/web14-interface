import { css } from '@emotion/react';
import theme from '@styles/theme';

export const roundButtonStyle = (style) => css`
	display: flex;
	box-sizing: border-box;
	justify-content: space-around;
	align-items: center;

	width: ${style.width}px;
	height: ${style.height}px;
	border-radius: ${style.height / 2}px;
	background-color: ${style.backgroundColor || theme.colors.primary};
	color: ${style.color || 'white'};
	font-size: ${style.fontsize || '24px'};

	&:hover {
		filter: ${style.color === 'black' ? `brightness(200%)` : `brightness(110%)`};
	}
`;
