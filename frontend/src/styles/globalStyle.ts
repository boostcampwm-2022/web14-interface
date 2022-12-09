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

	.App {
		position: absolute;
	}

	#popup-root {
		display: none;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
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

	textarea {
		resize: none;
	}
`;

interface flexPropType {
	gap?: string;
	justifyContent?: 'center' | 'space-between' | 'space-around';
	alignItems?: 'center';
}

export const flexRow = ({
	gap = '0px',
	justifyContent = 'center',
	alignItems = 'center',
}: flexPropType) => css`
	display: flex;
	flex-direction: row;
	justify-content: ${justifyContent};
	align-items: ${alignItems};
	gap: ${gap};
`;

export const flexColumn = ({
	gap = '0px',
	justifyContent = 'center',
	alignItems = 'center',
}: flexPropType) => css`
	display: flex;
	flex-direction: column;
	justify-content: ${justifyContent};
	align-items: ${alignItems};
	gap: ${gap};
`;

export default globalStyle;
