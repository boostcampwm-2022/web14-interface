import React, { KeyboardEventHandler } from 'react';

interface TextAreaType {
	value?: string;
	onChange?: React.Dispatch<React.SetStateAction<string>>;
	onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

const TextArea = ({ value, onChange, onKeyDown }: TextAreaType) => {
	return (
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onKeyDown={onKeyDown}
		></textarea>
	);
};

export default TextArea;
