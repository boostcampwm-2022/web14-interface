import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';
import React from 'react';
import { TextFieldHelperTextStyle, TextFieldStyle, TextFieldWrapperStyle } from './TextField.style';

export interface TextFieldPropType {
	width?: string;
	placeholder?: string;
	disabled?: boolean;
	readOnly?: boolean;
	error?: boolean;
	textAlign?: 'left' | 'center' | 'right';
	helperText?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	value?: string;
}

const TextField = ({
	width,
	placeholder,
	disabled = false,
	readOnly = false,
	error = false,
	textAlign = 'left',
	helperText,
	onChange,
	value,
}: TextFieldPropType) => {
	return (
		<div css={TextFieldWrapperStyle(width)}>
			<input
				css={(theme) => TextFieldStyle(theme, error, disabled, textAlign)}
				type="text"
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readOnly}
				onChange={onChange}
				value={value}
			/>
			{helperText?.trim().length > 0 ? (
				<span css={(theme) => TextFieldHelperTextStyle(theme, error)}>{helperText}</span>
			) : null}
		</div>
	);
};

export default TextField;
