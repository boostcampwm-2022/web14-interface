import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { ReactComponent as CopyIcon } from '@assets/icon/copy.svg';
import { toast } from 'react-toastify';

export interface RoomInfoModelPropType {
	value: string;
}

const RoomInfoModal = ({ value }: RoomInfoModelPropType) => {
	const copyRoomInfo = async () => {
		await navigator.clipboard.writeText(value);
		toast('복사 완료', {
			position: 'bottom-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
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
