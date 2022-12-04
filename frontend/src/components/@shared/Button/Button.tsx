import React from 'react';
import { buttonStyle } from './Button.style';

export interface buttonPropType {
	children?: React.ReactNode | React.ReactNode[];
	width?: string;
	size?: 'small' | 'medium';
	style?: 'contained' | 'text';
	color?: 'primary' | 'secondary' | 'red' | 'black';
	justifyContent?: 'center' | 'space-between';
	iconColor?: boolean;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	children,
	width,
	size = 'medium',
	style = 'contained',
	color = 'primary',
	justifyContent = 'center',
	iconColor = true,
	disabled = false,
	onClick,
}: buttonPropType) => {
	return (
		<button
			css={(theme) =>
				buttonStyle(theme, width, size, style, color, iconColor, justifyContent)
			}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
