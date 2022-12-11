import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { ReactComponent as CopyIcon } from '@assets/icon/copy.svg';

export interface RoomInfoModelPropType {
	value: string;
}

const RoomInfoModal = ({ value }: RoomInfoModelPropType) => {
	const copyValue = async () => {
		await navigator.clipboard.writeText(value);
		//TODO Toast로 변경
		alert('복사 완료');
	};

	return (
		<Modal>
			<Modal.Title>방 정보</Modal.Title>
			<Modal.ContentArea flexDirection="row">
				<Modal.TextField
					width="100%"
					textAlign="center"
					readOnly
					value={value}
				></Modal.TextField>
				<Modal.Button onClick={copyValue}>
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
