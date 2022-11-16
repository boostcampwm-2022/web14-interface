import { css } from '@emotion/react';
import React, { Children, ReactNode, isValidElement } from 'react';

const FVAScrollViewStyle = css`
	width: 100%;
	height: 200px;
	background-color: red;
	overflow-y: scroll;
`;

const FBAScrollView = ({ children }: { children?: ReactNode }) => {
	return <div css={FVAScrollViewStyle}>{children}</div>;
};

const FBAScrollViewType = (<FBAScrollView />).type;

const getFBAScrollView = (childArr: ReactNode[]) => {
	return childArr.filter((child) => isValidElement(child) && child.type === FBAScrollViewType);
};

const FBATextArea = () => {
	return <textarea></textarea>;
};
const FBATextAreaType = (<FBATextArea />).type;
const getFBATextArea = (childArr: ReactNode[]) => {
	return childArr.filter((child) => isValidElement(child) && child.type === FBATextAreaType);
};

const FBAMain = ({ children }: { children: ReactNode }) => {
	const childArr = Children.toArray(children);

	const FBAScrollView = getFBAScrollView(childArr);
	const FBATextArea = getFBATextArea(childArr);

	return (
		<div>
			{FBAScrollView}
			{FBATextArea}
		</div>
	);
};

const FeedbackArea = Object.assign(FBAMain, {
	FBAScrollView,
	FBATextArea,
});

export default FeedbackArea;
