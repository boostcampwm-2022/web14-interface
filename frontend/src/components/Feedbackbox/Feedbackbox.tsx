import { css } from '@emotion/react';
import React, { forwardRef } from 'react';

const mainStyle = css`
	width: 100%;
	height: 70px;
`;

function getContent(children: React.ReactNode[]) {
	return children.filter((child) => React.isValidElement(child) && child.type === FbContentType);
}

function getStartTime(children: React.ReactNode[]) {
	return children.filter(
		(child) => React.isValidElement(child) && child.type === FbStartTimeType
	);
}

function getEditBtn(children: React.ReactNode[]) {
	return children.filter((child) => React.isValidElement(child) && child.type === FbEditBtnType);
}

function getDeleteBtn(children: React.ReactNode[]) {
	return children.filter(
		(child) => React.isValidElement(child) && child.type === FbDeleteBtnType
	);
}

const FbMain = (
	{ children, onClickFeedback }: { children: React.ReactNode; onClickFeedback?: any },
	ref
) => {
	const childrenArr = React.Children.toArray(children);

	const FbContent = getContent(childrenArr);
	const FbStartTime = getStartTime(childrenArr);
	const FbEditBtn = getEditBtn(childrenArr);
	const FbDeleteBtn = getDeleteBtn(childrenArr);

	return (
		<div css={mainStyle} ref={ref} onClick={onClickFeedback}>
			{FbStartTime}
			{FbContent}
		</div>
	);
};

const FbContent = ({ children }: { children?: React.ReactNode }) => {
	return <span>{children}</span>;
};
const FbContentType = (<FbContent />).type;

const FbStartTime = ({ children }: { children?: React.ReactNode }) => {
	return <span>{children}</span>;
};
const FbStartTimeType = (<FbStartTime />).type;

const FbEditBtn = () => {
	return <button>edit</button>;
};
const FbEditBtnType = (<FbEditBtn />).type;

const FbDeleteBtn = () => {
	return <button>delete</button>;
};
const FbDeleteBtnType = (<FbDeleteBtn />).type;

export const Feedbackbox = Object.assign(forwardRef(FbMain), {
	Content: FbContent,
	StartTime: FbStartTime,
	EditBtn: FbEditBtn,
	DeleteBtn: FbDeleteBtn,
});
