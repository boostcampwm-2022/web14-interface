import { css } from '@emotion/react';

export const TextFieldStyle = (theme, width, error, disabled) => css`
	width: ${width};
	background-color: ${disabled ? theme.colors.gray3 : theme.colors.secondary};
	color: ${error ? theme.colors.red : disabled ? theme.colors.gray2 : theme.colors.black};
	padding: 12px;

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
