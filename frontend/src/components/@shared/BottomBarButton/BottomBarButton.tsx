import { css } from '@emotion/react';
import React from 'react';
import { buttonStyle } from '../Button/Button.style';

export interface buttonPropType {
	children?: React.ReactNode | React.ReactNode[];
	width?: string;
	size?: 'small' | 'medium' | 'large';
	style?: 'contained' | 'text';
	color?: 'primary' | 'secondary' | 'red' | 'black';
	justifyContent?: 'center' | 'space-between';
	iconColor?: boolean;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BottomBarButtom = ({
	children,
	width,
	size = 'large',
	style = 'text',
	color = 'secondary',
	justifyContent = 'center',
	iconColor = true,
	disabled = false,
	onClick,
}: buttonPropType) => {
	return (
		<button
			css={[
				(theme) => buttonStyle(theme, width, size, style, color, iconColor, justifyContent),
				bottomBarPadding,
			]}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default BottomBarButtom;

const bottomBarPadding = () => css`
	padding: 8px 12px;
`;
