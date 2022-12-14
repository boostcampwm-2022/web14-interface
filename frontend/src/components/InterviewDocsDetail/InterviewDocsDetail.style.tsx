import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const docsItemWrapperStyle = (theme) => css`
	${flexRow({ justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' })};
	flex: 0 0 auto;

	width: 100%;
	height: 100%;
`;

export const docsItemVideoAreaStyle = () => css`
	${flexColumn({ gap: '32px', justifyContent: 'unset' })};

	width: 388px;

	table {
		width: 100%;
	}
`;

export const docsItemFbAreaStyle = () => css`
	${flexColumn({})};
	width: 70%;
	height: 100%;
`;

export const docsUserTabContainerStyle = (theme) => css`
	${flexRow({ gap: '12px', justifyContent: 'unset' })};

	padding: 0px 12px;
`;

export const docsUserTabStyle = (theme) => css`
	${flexRow({ gap: '12px', justifyContent: 'unset' })};
	overflow-x: scroll;
	padding: 8px 0px;

	button {
		flex: 0 0 auto;
	}

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const docsItemFbListStyle = (theme) => css`
	${flexColumn({ gap: '0px', justifyContent: 'unset' })}
	width: 100%;
	height: calc(100% - 56px);
	overflow: auto;

	padding: 12px 0px 12px 12px;
`;

export const noFeedbackUserStyle = () => css`
	width: 300px;
`;
