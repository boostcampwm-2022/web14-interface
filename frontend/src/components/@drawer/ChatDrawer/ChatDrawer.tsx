import React, { useState } from 'react';
import { socketEmit } from '@api/socket.api';
import TextField from '@components/@shared/TextField/TextField';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { meInRoomState } from '@store/user.store';
import Button from '@components/@shared/Button/Button';
import { chatListState } from '@store/chatList.store';
import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export enum ChatTarget {
	EVERYONE = 'everyone',
	DRIECT = 'direct',
	ROLE = 'role',
}

const ChatDrawer = () => {
	const me = useRecoilValue(meInRoomState);
	const [chatContent, setChatContent] = useState('');
	const [chatList, setChatList] = useRecoilState(chatListState);

	const checkMe = (nickname) => me.nickname === nickname;
	const handleChangeChatContent = (e) => {
		setChatContent(e.target.value);
	};

	const sendChat = (e) => {
		e.preventDefault();

		if (chatContent.trim().length <= 0) return;

		const sendChat = {
			nickname: me.nickname,
			content: chatContent,
			target: ChatTarget.EVERYONE,
		};
		socketEmit(SOCKET_EVENT_TYPE.SEND_MESSAGE, sendChat);

		setChatList([sendChat, ...chatList]);
		setChatContent('');
	};

	return (
		<div css={chatDrawerStyle}>
			<div css={chatListContainer}>
				{chatList.map(({ nickname, content, timestamp }) => {
					return (
						<div
							css={(theme) => chatItemStyle(theme, checkMe(nickname))}
							key={timestamp}
						>
							<div css={chatNicknameStyle}>{nickname}</div>
							<div css={(theme) => chatContentStyle(theme, checkMe(nickname))}>
								{content}
							</div>
						</div>
					);
				})}
			</div>
			<div>
				<form css={chatInputStyle} onSubmit={sendChat}>
					<TextField value={chatContent} onChange={handleChangeChatContent}></TextField>
					<Button onClick={sendChat}>Send</Button>
				</form>
			</div>
		</div>
	);
};

export default ChatDrawer;

const chatDrawerStyle = (theme) => css`
	${flexColumn({ justifyContent: 'space-between' })};
	width: 100%;
	height: calc(100% - 56px);
`;

export const chatListContainer = (theme) => css`
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
`;
