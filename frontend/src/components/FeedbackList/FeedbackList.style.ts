import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const fbTimelineStyle = (theme) => css`
	position: relative;

	width: 100%;
	height: 100%;
`;

export const timelineStyle = (theme) => css`
	width: 3px;
	height: 100%;
	margin-left: 24px;

	background-color: ${theme.colors.secondary};
	border-radius: ${theme.borderRadius};
	opacity: 0.5;
`;

export const feedbackListStyle = css`
	${flexColumn({ gap: '8px', justifyContent: 'unset' })};

	position: absolute;

	width: 100%;
	height: 100%;
	padding: 12px 0px;

	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&&::-webkit-scrollbar {
		display: none;
	}
`;

export const emptyFeedbackStyle = (theme) => css`
	${flexRow({})};

	width: 100%;
	height: 100%;
	color: inherit;
`;
