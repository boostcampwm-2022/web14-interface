import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';

export const docsListWrapperStyle = (theme) => css`
	${flexColumn({ justifyContent: 'unset' })};
	flex: 0 0 auto;

	width: 100%;
	height: 100%;

	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-thumb {
		height: 20%;
		background-color: ${theme.colors.primary};

		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(33, 122, 244, 0.1);
	}
`;

export const emptyList = () => css`
	margin: auto;
`;
