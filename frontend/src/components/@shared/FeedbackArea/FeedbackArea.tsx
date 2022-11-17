import TextArea from '@components/@shared/TextArea/TextArea';
import { css } from '@emotion/react';
import React, { Children, ReactNode, isValidElement, useState } from 'react';

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

interface FATextAreaType {
	onInsertFeedback?: (feedback: string) => void;
}
const FATextArea = ({ onInsertFeedback }: FATextAreaType) => {
	const [feedbackInput, setFeedbackInput] = useState('');

	const createFeedback = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onInsertFeedback(feedbackInput);
			setFeedbackInput('');
		}
	};

	return (
		<TextArea value={feedbackInput} onChange={setFeedbackInput} onKeyDown={createFeedback} />
	);
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