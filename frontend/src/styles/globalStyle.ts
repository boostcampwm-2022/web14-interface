import { css } from '@emotion/react';

const globalStyle = css`
	body {
		margin: 0;
		padding: 0;
	}

	html,
	body,
	#root {
		width: 100%;
		height: 100%;
		font-family: 'Noto Sans KR', sans-serif;
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
	}

	input {
		outline: none;
	}
`;

export default globalStyle;
