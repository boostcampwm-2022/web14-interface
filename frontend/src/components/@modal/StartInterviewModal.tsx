import React from 'react';
import useSocket from '@hooks/useSocket';
import Modal from '@components/@shared/Modal/Modal';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { UserType } from '@customType/user';
import { useUserRole } from '@hooks/useUserRole';
import { useRecoilValue } from 'recoil';
import { meInRoomState } from '@store/user.store';
import { css } from '@emotion/react';

interface joinInterviewResponseType {
	usersInRoom: UserType[];
}

const StartInterviewModal = () => {
	const { closeModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	const { setUserRole } = useUserRole();
	const { socketEmit } = useSocket();
	const me = useRecoilValue(meInRoomState);

	const handleStartInterviewee = async () => {
		await socketEmit<joinInterviewResponseType>(SOCKET_EVENT_TYPE.START_INTERVIEW);

		setUserRole(me);
		closeModal();
		safeNavigate(PAGE_TYPE.INTERVIEWEE_PAGE);
	};

	return (
		<Modal>
			<Modal.Title>면접자로 시작하시겠습니까?</Modal.Title>
			<Modal.ContentArea>
				<span css={timeLimitMessage}>최대 녹화 가능 시간은 1시간입니다.</span>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.CloseButton>취소</Modal.CloseButton>
				<Modal.Button onClick={handleStartInterviewee}>시작</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default StartInterviewModal;

const timeLimitMessage = (theme) => css`
	color: ${theme.colors.red};
`;
