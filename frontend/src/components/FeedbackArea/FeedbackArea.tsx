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
	const [input, setInput] = useState('');

	//TODO 좋은 명명법을 찾습니다.
	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (!e.shiftKey) {
				e.preventDefault();
				onInsertFeedback(input);
				setInput('');
			}
		}
	};

	return <TextArea value={input} onChange={setInput} onKeyDown={onKeyDown} />;
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
