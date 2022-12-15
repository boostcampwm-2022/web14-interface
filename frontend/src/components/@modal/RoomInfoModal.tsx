import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { ReactComponent as CopyIcon } from '@assets/icon/copy.svg';
import useToast from '@hooks/useToast';

export interface RoomInfoModelPropType {
	value: string;
}

const RoomInfoModal = ({ value }: RoomInfoModelPropType) => {
	const { popToast } = useToast();

	const copyRoomInfo = async () => {
		await navigator.clipboard.writeText(value);
		popToast('복사 완료');
	};

	return (
		<Modal>
			<Modal.Title>방 정보</Modal.Title>
			<Modal.ContentArea flexDirection="row">
				<Modal.TextField width="100%" textAlign="center" readOnly value={value} />
				<Modal.Button onClick={copyRoomInfo}>
					<CopyIcon />
				</Modal.Button>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.CloseButton style="contained" color="red">
					닫기
				</Modal.CloseButton>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default RoomInfoModal;
