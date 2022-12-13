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
	visibility?: 'visible' | 'hidden';
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
	visibility,
}: buttonPropType) => {
	return (
		<button
			css={[
				(theme) => buttonStyle(theme, width, size, style, color, iconColor, justifyContent),
				bottomBarPadding(visibility),
			]}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default BottomBarButtom;

const bottomBarPadding = (visibility) => css`
	visibility: ${visibility};
	padding: 8px 12px;
`;
