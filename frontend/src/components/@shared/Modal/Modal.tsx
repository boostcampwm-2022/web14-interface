import React from 'react';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import {
	ModalButtonAreaStyle,
	ModalContentAreaStyle,
	ModalTitleStyle,
	ModalWrapperStyle,
} from './Modal.style';

export interface ModalPropType {
	children: React.ReactNode | React.ReactNode[];
}

const ModalTitle = ({ children }: any) => {
	return <span css={ModalTitleStyle}>{children}</span>;
};

const ModalContentArea = ({ children }: ModalPropType) => {
	return <div css={ModalContentAreaStyle}>{children}</div>;
};

const ModalButtonArea = ({ children }: ModalPropType) => {
	const isArray = Array.isArray(children);

	return <div css={ModalButtonAreaStyle(isArray)}>{children}</div>;
};

const ModalWrapper = ({ children }: ModalPropType) => {
	return <div css={ModalWrapperStyle}>{children}</div>;
};

const Modal = Object.assign(ModalWrapper, {
	Title: ModalTitle,
	ContentArea: ModalContentArea,
	ButtonArea: ModalButtonArea,
	Button,
	TextField,
});

export default Modal;
