import React from 'react';
import axios from 'axios';

import useSocket from '@hooks/useSocket';
import Modal from '@components/@shared/Modal/Modal';
import { PAGE_TYPE } from '@constants/page.constant';
import { REST_TYPE } from '@constants/rest.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { FeedbackDtoType } from '@customType/dto';
import useModal from '@hooks/useModal';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { feedbackDtoSelector } from '@store/feedback.store';
import { completedFbCntState, docsUUIDState } from '@store/interview.store';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface endFeedbackResponseType {
	isLastFeedback: boolean;
	count: number;
}

const EndFeedbackModal = () => {
	const { closeModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	const { socketEmit } = useSocket();

	const setCompletedFbCnt = useSetRecoilState(completedFbCntState);
	const docsUUID = useRecoilValue(docsUUIDState);
	const feedbackListDto = useRecoilValue(feedbackDtoSelector);

	const handleEndFeedback = async () => {
		const { isLastFeedback, count } = await socketEmit<endFeedbackResponseType>(
			SOCKET_EVENT_TYPE.END_FEEDBACK
		);

		const feedbackDto: FeedbackDtoType = {
			docsUUID,
			feedbackList: feedbackListDto,
		};

		axios.post(REST_TYPE.FEEDBACK, feedbackDto);

		setCompletedFbCnt(count);

		closeModal();

		if (isLastFeedback) safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		else safeNavigate(PAGE_TYPE.WAITTING_PAGE);
	};

	return (
		<Modal>
			<Modal.Title>피드백을 제출하시겠습니까?</Modal.Title>
			<Modal.ContentArea>
				<span>제출된 피드백은 더 이상 수정할 수 없습니다.</span>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.CloseButton>취소</Modal.CloseButton>
				<Modal.Button onClick={handleEndFeedback}>제출</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default EndFeedbackModal;
