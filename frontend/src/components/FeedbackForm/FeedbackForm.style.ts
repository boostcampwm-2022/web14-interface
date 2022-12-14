import { fbStartTimeStyle } from '@components/FeedbackItem/FeedbackItem.style';
import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const fbFormWrapperStyle = () => css`
	${flexRow({ gap: '8px', justifyContent: 'unset', alignItems: 'flex-start' })};
	width: 100%;
`;

export const fbFormStyle = css`
	width: 100%;
`;

export const fbInputWrapperStyle = (theme) => css`
	width: calc(100% - 32px - 68px);
	height: 96px;
	background-color: ${theme.colors.secondary};
	padding: 16px;

	border: none;
	border-radius: ${theme.borderRadius};
`;

export const fbInputStyle = (theme) => css`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0);

	border: none;
	border-radius: ${theme.borderRadius};
	outline: none;

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	&&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

export const fbFormStartTimeStyle = (theme) => css`
	${fbStartTimeStyle(theme, false)};
`;
