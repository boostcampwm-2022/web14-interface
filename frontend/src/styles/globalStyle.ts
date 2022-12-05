import { css } from '@emotion/react';

const globalStyle = css`
	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;
	}

	html,
	body,
	#root,
	.App {
		width: 100%;
		height: 100%;
	}

	ul,
	li {
		list-style: none;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		font-family: 'Noto Sans KR', sans-serif;
	}

	input {
		outline: none;
		font-family: 'Noto Sans KR', sans-serif;
	}
`;

export const flexRow = ({ gap }) => css`
	display: flex;
	flex-direction: row;
	gap: ${gap};
`;

export const flexColumn = ({ gap }) => css`
	display: flex;
	flex-direction: column;
	gap: ${gap};
`;

export default globalStyle;
