import React from 'react';
import { socketEmit } from '@api/socket.api';
import Modal from '@components/@shared/Modal/Modal';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { UserType } from '@customType/user';
import { SetterOrUpdater } from 'recoil';

export interface StartInterviewModalPropType {
	me: UserType;
	setMe: SetterOrUpdater<UserType>;
	others: UserType[];
	setOthers: SetterOrUpdater<UserType[]>;
}

interface joinInterviewResponseType {
	usersInRoom: UserType[];
}

const StartInterviewModal = ({ me, setMe, others, setOthers }: StartInterviewModalPropType) => {
	const { closeModal } = useModal();
	const { safeNavigate } = useSafeNavigate();

	const handleStartInterviewee = async () => {
		await socketEmit<joinInterviewResponseType>(SOCKET_EVENT_TYPE.START_INTERVIEW);

		const newOthers = others.map((user) => {
			return { ...user, role: 'interviewer' };
		});

		setMe({ ...me, role: 'interviewee' });
		setOthers(newOthers);
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
