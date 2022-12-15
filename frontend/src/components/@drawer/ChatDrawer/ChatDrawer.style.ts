import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const chatDrawerStyle = () => css`
	${flexColumn({ justifyContent: 'space-between' })};
	width: 100%;
	height: calc(100% - 56px);
`;

export const chatListContainer = () => css`
	display: flex;
	flex-direction: column-reverse;
	gap: 16px;

	width: 100%;
	height: 100%;
	padding: 12px 0px;

	overflow: auto;
`;

export const chatItemStyle = (theme, isMe) => css`
	${flexColumn({ gap: '4px', alignItems: isMe ? 'end' : 'flex-start' })};

	width: 100%;
	text-align: ${isMe ? 'right' : 'left'};
`;

export const chatNicknameStyle = (theme) => css`
	color: ${theme.colors.white};
	font-size: ${theme.fontSize.xSmall};
`;

export const chatContentStyle = (theme, isMe) => css`
	width: 80%;
	padding: 12px;

	color: ${isMe ? theme.colors.white : theme.colors.black};
	background-color: ${isMe ? theme.colors.primary : theme.colors.gray3};

	font-size: ${theme.fontSize.small};
	border-radius: ${theme.borderRadius};
`;

export const chatInputStyle = (theme) => css`
	${flexRow({ gap: '8px', alignItems: 'center' })};

	width: 100%;
	height: 56px;
	padding-top: 16px;

	border-top: 1px solid ${theme.colors.white};
`;
