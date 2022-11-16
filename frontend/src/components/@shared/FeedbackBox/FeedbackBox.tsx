import React, { forwardRef } from 'react';

function getContent(children: React.ReactNode[]) {
	return children.filter((child) => React.isValidElement(child) && child.type === FbContentType);
}

function getStartTime(children: React.ReactNode[]) {
	return children.filter(
		(child) => React.isValidElement(child) && child.type === FbStartTimeType
	);
}

function getBtns(children: React.ReactNode[]) {
	return children.filter((child) => React.isValidElement(child) && child.type === FbBtnType);
}

// TODO: handler optional 삭제
const FbMain = (
	{
		children,
		onClick,
	}: {
		children: React.ReactNode;
		onClick?: React.MouseEventHandler<HTMLElement>;
	},
	ref
) => {
	const childrenArr = React.Children.toArray(children);

	const FbContent = getContent(childrenArr);
	const FbStartTime = getStartTime(childrenArr);
	const FbBtns = getBtns(childrenArr);

	return (
		<div onClick={onClick} ref={ref}>
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
	onClick,
}: {
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLElement>;
}) => {
	return <button onClick={onClick}>{children}</button>;
};
const FbBtnType = (<FbBtn />).type;

export const FeedbackBox = Object.assign(forwardRef(FbMain), {
	Content: FbContent,
	StartTime: FbStartTime,
	Btn: FbBtn,
});
