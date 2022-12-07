import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';
import React from 'react';
import { TextFieldHelperTextStyle, TextFieldStyle } from './TextField.style';

export interface TextFieldPropType {
	width?: string;
	placeholder?: string;
	disabled?: boolean;
	readOnly?: boolean;
	error?: boolean;
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
	helperText,
	onChange,
	value,
}: TextFieldPropType) => {
	return (
		<div css={flexColumn({ gap: '4px' })}>
			<input
				css={(theme) => TextFieldStyle(theme, width, error, disabled)}
				type="text"
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readOnly}
				onChange={onChange}
				value={value}
			/>
			{!disabled && helperText?.trim().length > 0 ? (
				<span css={(theme) => TextFieldHelperTextStyle(theme, error)}>{helperText}</span>
			) : null}
		</div>
	);
};

export default TextField;
