import React from 'react';
import { roundButtonStyle } from './RoundButton.style';

export interface roundButtonPropType {
	children?: React.ReactNode | React.ReactNode[];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	style: StyleType;
}

export interface StyleType {
	theme?: any;
	width?: number;
	size?: 'small' | 'medium';
	color?: 'primary' | 'secondary' | 'red' | 'black';
}

const RoundButton = ({ children, onClick, style }: roundButtonPropType) => {
	return (
		<button css={(theme) => roundButtonStyle({ ...style, theme })} onClick={onClick}>
			{children}
		</button>
	);
};

export default RoundButton;
