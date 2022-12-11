import React from 'react';
import { roundButtonStyle } from './RoundButton.style';

export interface roundButtonPropType {
	children?: React.ReactNode | React.ReactNode[];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	style: StyleType;
}
interface StyleType {
	width?: number;
	height?: number;
	backgroundColor?: string;
	color?: string;
}

const RoundButton = (prop: roundButtonPropType) => {
	const { children, onClick, style } = prop;
	return (
		<button css={(theme) => roundButtonStyle({ ...style, theme })} onClick={onClick}>
			{children}
		</button>
	);
};

export default RoundButton;
