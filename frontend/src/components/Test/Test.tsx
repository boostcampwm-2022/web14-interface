import React from 'react';

export interface TestPropType {
	text: string;
}

const Test = ({ text }: TestPropType) => {
	return <div>{text}</div>;
};

export default Test;
