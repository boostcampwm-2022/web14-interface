import React, { useState } from 'react';
import useSocket from '@hooks/useSocket';
import TextField from '@components/@shared/TextField/TextField';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { meInRoomState } from '@store/user.store';
import Button from '@components/@shared/Button/Button';
import { chatListState } from '@store/chatList.store';
import {
	chatContentStyle,
	chatDrawerStyle,
	chatInputStyle,
	chatItemStyle,
	chatListContainer,
	chatNicknameStyle,
} from './ChatDrawer.style';

export enum ChatTarget {
	EVERYONE = 'everyone',
	DRIECT = 'direct',
	ROLE = 'role',
}

const ChatDrawer = () => {
	const me = useRecoilValue(meInRoomState);
	const [chatContent, setChatContent] = useState('');
	const [chatList, setChatList] = useRecoilState(chatListState);

	const { socketEmit } = useSocket();

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
			<form css={chatInputStyle} onSubmit={sendChat}>
				<TextField value={chatContent} onChange={handleChangeChatContent}></TextField>
				<Button onClick={sendChat}>Send</Button>
			</form>
		</div>
	);
};

export default ChatDrawer;
