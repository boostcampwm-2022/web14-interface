import React from 'react';

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

const FbMain = ({ children }: { children: React.ReactNode }) => {
	const childrenArr = React.Children.toArray(children);

	const FbContent = getContent(childrenArr);
	const FbStartTime = getStartTime(childrenArr);
	const FbEditBtn = getEditBtn(childrenArr);
	const FbDeleteBtn = getDeleteBtn(childrenArr);

	return (
		<div>
			<div>{FbStartTime}</div>
			<div>{FbContent}</div>
			{FbEditBtn && <div>{FbEditBtn}</div>}
			{FbDeleteBtn && <div>{FbDeleteBtn}</div>}
		</div>
	);
};

const FbContent = ({ children }: { children?: React.ReactNode }) => {
	return <div>{children}</div>;
};
const FbContentType = (<FbContent />).type;

const FbStartTime = ({ children }: { children?: React.ReactNode }) => {
	return <div>{children}</div>;
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

export const Feedbackbox = Object.assign(FbMain, {
	Content: FbContent,
	StartTime: FbStartTime,
	EditBtn: FbEditBtn,
	DeleteBtn: FbDeleteBtn,
});
