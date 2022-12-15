import { css } from '@emotion/react';

export const docsItemWrapper = (theme, style) =>
	css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 15px;
		width: 100%;
		gap: 40px;
		cursor: pointer;

		${style === 'card' ? cardDocsStyle(theme) : listDocsStyle(theme)};
		div {
			display: flex;
			justify-content: space-between;
		}

		&:hover {
			background-color: ${theme.colors.primary + '11'};
		}

		&:has(button:hover) {
			background: none;
		}
	`;

const cardDocsStyle = (theme) => css`
	background-color: ${theme.colors.primary};
	height: 150px;
	color: white;
	border-radius: 4px;
`;

const listDocsStyle = (theme) => css`
	border-bottom: 1px solid ${theme.colors.gray3};
`;

export const indexStyle = css`
	font-size: 24px;
	font-weight: 700;
`;
export const playTimeStyle = css`
	font-size: 16px;
	font-weight: 400;
`;
export const createdAtStyle = css`
	font-size: 12px;
	font-weight: 400;
	align-self: flex-end;
`;
