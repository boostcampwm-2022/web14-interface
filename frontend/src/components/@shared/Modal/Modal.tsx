import useModal from '@hooks/useModal';
import React from 'react';
import Button, { buttonPropType } from '../Button/Button';
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

export interface ModalContentAreaPropType {
	children: React.ReactNode | React.ReactNode[];
	gap?: string;
	flexDirection?: 'column' | 'row';
}

export interface ModalCloseButtonPropType extends buttonPropType {
	children: React.ReactNode | React.ReactNode[];
}

export interface ModalTitlePropTYpe extends ModalPropType {
	color?: 'red' | 'black' | 'primary';
}

const ModalTitle = ({ children, color = 'black' }: ModalTitlePropTYpe) => {
	return <span css={(theme) => ModalTitleStyle(theme, color)}>{children}</span>;
};

const ModalContentArea = ({
	children,
	gap,
	flexDirection = 'column',
}: ModalContentAreaPropType) => {
	return <div css={ModalContentAreaStyle(gap, flexDirection)}>{children}</div>;
};

const ModalButtonArea = ({ children }: ModalPropType) => {
	const isArray = Array.isArray(children);

	return <div css={ModalButtonAreaStyle(isArray)}>{children}</div>;
};

const ModalCloseButton = (props: ModalCloseButtonPropType) => {
	const { closeModal } = useModal();

	return (
		<Button color="black" style="text" {...props} onClick={closeModal}>
			{props.children}
		</Button>
	);
};

const ModalWrapper = ({ children }: ModalPropType) => {
	return <div css={ModalWrapperStyle}>{children}</div>;
};

const Modal = Object.assign(ModalWrapper, {
	Title: ModalTitle,
	ContentArea: ModalContentArea,
	ButtonArea: ModalButtonArea,
	Button,
	CloseButton: ModalCloseButton,
	TextField,
});

export default Modal;
