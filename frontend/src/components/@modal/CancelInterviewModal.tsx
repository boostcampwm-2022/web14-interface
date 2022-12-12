import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import useModal from '@hooks/useModal';

const CancelInterviewModal = () => {
	const { closeModal } = useModal();

	const cancelInterview = () => {
		//TODO BE와 협의하여 면접 취소 로직 붙이기
		closeModal();
	};

	return (
		<Modal>
			<Modal.Title>면접을 취소하시겠습니까?</Modal.Title>
			<Modal.ContentArea>
				<span>현재까지 진행 사항이 저장되지 않습니다.</span>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.CloseButton>돌아가기</Modal.CloseButton>
				<Modal.Button color="red" onClick={cancelInterview}>
					취소
				</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default CancelInterviewModal;
