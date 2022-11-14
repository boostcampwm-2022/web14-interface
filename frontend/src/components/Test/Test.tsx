import { css } from '@emotion/react';
import React from 'react';

export interface TestPropType {
	text: string;
}

const Test = ({ text }: TestPropType) => {
	return <div css={testCss}>{text}</div>;
};

export default Test;

const testCss = css`
	background-color: red;
`;
