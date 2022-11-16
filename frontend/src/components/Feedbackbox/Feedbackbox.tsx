import React from 'react';

function getContent(children: React.ReactNode[]) {
	return children.filter((child) => React.isValidElement(child) && child.type === FbContentType);
}

function getStartTime(children: React.ReactNode[]) {
	return children.filter(
		(child) => React.isValidElement(child) && child.type === FbStartTimeType
	);
}

function getBtn(children: React.ReactNode[]) {
	return children.filter((child) => React.isValidElement(child) && child.type === FbBtnType);
}

const FbMain = ({
	children,
	handleClick,
}: {
	children: React.ReactNode;
	handleClick: React.MouseEventHandler<HTMLElement>;
}) => {
	const childrenArr = React.Children.toArray(children);

	const FbContent = getContent(childrenArr);
	const FbStartTime = getStartTime(childrenArr);
	const FbBtns = getBtn(childrenArr);

	return (
		<div onClick={handleClick}>
			<div>{FbStartTime}</div>
			<div>{FbContent}</div>
			<div>{FbBtns}</div>
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

const FbBtn = ({
	children,
	handleClick,
}: {
	children?: React.ReactNode;
	handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
	return <button onClick={handleClick}>{children}</button>;
};
const FbBtnType = (<FbBtn />).type;

export const Feedbackbox = Object.assign(FbMain, {
	Content: FbContent,
	StartTime: FbStartTime,
	Btn: FbBtn,
});
