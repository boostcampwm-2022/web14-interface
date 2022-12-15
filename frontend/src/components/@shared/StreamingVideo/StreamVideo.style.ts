import { css } from '@emotion/react';
import { videoStyle, videoWrapperStyle } from '../Video/Video.style';

export const streamVideoWrapperStyle = (theme, width, height) => css`
	${videoWrapperStyle(theme, width, height)};

	position: relative;
`;

export const streamVideoStyle = () => css`
	${videoStyle()};
	transform: rotateY(180deg);
`;

export const nameTagStyle = (theme, audio) => css`
	display: flex;
	align-items: center;
	gap: 8px;

	position: absolute;
	bottom: 0px;
	left: 0px;

	max-width: 50%;
	height: 20px;
	background-color: black;
	padding: 12px 8px;

	color: ${theme.colors.white};
	line-height: 24px;

	border-top-right-radius: ${theme.borderRadius};
	border-bottom-left-radius: ${theme.borderRadius};

	svg {
		flex: 0 0 auto;
		width: 16px;
		height: 16px;
		fill: ${audio ? theme.colors.white : theme.colors.red};
	}

	span {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;
