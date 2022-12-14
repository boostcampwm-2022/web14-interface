import React, { forwardRef } from 'react';
import { buttonStyle } from './Button.style';

export interface buttonPropType {
	children?: React.ReactNode | React.ReactNode[];
	width?: string;
	size?: 'xSmall' | 'small' | 'medium' | 'large';
	style?: 'contained' | 'text';
	color?: 'primary' | 'secondary' | 'red' | 'black';
	justifyContent?: 'center' | 'space-between';
	iconColor?: boolean;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (
	{
		children,
		width,
		size = 'medium',
		style = 'contained',
		color = 'primary',
		justifyContent = 'center',
		iconColor = true,
		disabled = false,
		onClick,
	}: buttonPropType,
	ref
) => {
	return (
		<button
			ref={ref}
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

export default forwardRef(Button);
