import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';

export const TextFieldWrapperStyle = (width) => css`
	${flexColumn({ gap: '4px' })};

	width: ${width};
`;

export const TextFieldStyle = (theme, error, disabled, textAlign) => css`
	width: 100%;
	background-color: ${disabled ? theme.colors.gray3 : theme.colors.secondary};
	color: ${error ? theme.colors.red : disabled ? theme.colors.gray2 : theme.colors.black};
	padding: 12px;

	text-align: ${textAlign};
	font-size: ${theme.fontSize.small};

	border: 1px solid ${!disabled && error ? theme.colors.red : theme.colors.gray2};
	border-radius: ${theme.borderRaduis};

	&::placeholder {
		color: ${theme.colors.gray2};
	}
`;

export const TextFieldHelperTextStyle = (theme, error) => css`
	color: ${error ? theme.colors.red : theme.colors.gray2};

	font-size: ${theme.fontSize.xSmall};
`;
