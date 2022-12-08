import React from 'react';
import { roundButtonStyle } from './RoundButton.style';

export interface Prop {
	children?: React.ReactNode | React.ReactNode[];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	style: StyleType;
}

interface StyleType {
	width?: number;
	height?: number;
	backgroundColor?: string;
	color?: string;
	iconColor?: boolean;
}

const RoundButton = (prop: Prop) => {
	const { children, onClick, style } = prop;
	return (
		<button css={(theme) => roundButtonStyle({ ...style, theme })} onClick={onClick}>
			{children}
		</button>
	);
};

export default RoundButton;
