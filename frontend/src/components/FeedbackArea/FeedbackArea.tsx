import { css } from '@emotion/react';
import React, { Children, ReactNode, isValidElement } from 'react';

const FAScrollViewStyle = css`
	width: 100%;
	height: 200px;
	background-color: red;
	overflow-y: scroll;
`;

const FAScrollView = ({ children }: { children?: ReactNode }) => {
	return <div css={FAScrollViewStyle}>{children}</div>;
};
const FAScrollViewType = (<FAScrollView />).type;
const getFAScrollView = (childArr: ReactNode[]) => {
	return childArr.filter((child) => isValidElement(child) && child.type === FAScrollViewType);
};

const FATextArea = () => {
	return <textarea></textarea>;
};
const FATextAreaType = (<FATextArea />).type;
const getFATextArea = (childArr: ReactNode[]) => {
	return childArr.filter((child) => isValidElement(child) && child.type === FATextAreaType);
};

const FBAMain = ({ children }: { children: ReactNode }) => {
	const childArr = Children.toArray(children);

	const FAScrollView = getFAScrollView(childArr);
	const FATextArea = getFATextArea(childArr);

	return (
		<div>
			{FAScrollView}
			{FATextArea}
		</div>
	);
};

const FeedbackArea = Object.assign(FBAMain, {
	FAScrollView,
	FATextArea,
});

export default FeedbackArea;
