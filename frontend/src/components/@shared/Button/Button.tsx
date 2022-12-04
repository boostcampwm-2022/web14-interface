import React from 'react';
import { buttonStyle } from './Button.style';

export interface buttonPropType {
	children?: React.ReactNode | React.ReactNode[];
	width?: string;
	size?: 'small' | 'medium';
	style?: 'contained' | 'text';
	color?: 'primary' | 'secondary' | 'red' | 'black';
	iconColor?: boolean;
	disabled?: boolean;
}

const Button = ({
	children,
	width,
	size = 'medium',
	style = 'contained',
	color = 'primary',
	iconColor = true,
	disabled = false,
}: buttonPropType) => {
	return (
		<button
			disabled={disabled}
			css={(theme) => buttonStyle(theme, width, size, style, color, iconColor)}
		>
			{children}
		</button>
	);
};

export default Button;
