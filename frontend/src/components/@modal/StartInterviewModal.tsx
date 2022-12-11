import React from 'react';
import { socketEmit } from '@api/socket.api';
import Modal from '@components/@shared/Modal/Modal';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { UserType } from '@customType/user';
import { useUserRole } from '@hooks/useUserRole';
import { useRecoilValue } from 'recoil';
import { meInRoomState } from '@store/room.store';

interface joinInterviewResponseType {
	usersInRoom: UserType[];
}

const StartInterviewModal = () => {
	const { closeModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	const { setUserRole } = useUserRole();
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
			<Modal.ButtonArea>
				<Modal.CloseButton>취소</Modal.CloseButton>
				<Modal.Button onClick={handleStartInterviewee}>시작</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default StartInterviewModal;
