import { css } from '@emotion/react';
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
		id,
	}: {
		children: React.ReactNode;
		onClick?: React.MouseEventHandler<HTMLElement>;
		id?: string;
	},
	ref
) => {
	const childrenArr = React.Children.toArray(children);

	const FbContent = getContent(childrenArr);
	const FbStartTime = getStartTime(childrenArr);
	const FbBtns = getBtns(childrenArr);

	return (
		<div id={id} onClick={onClick} ref={ref}>
			<div>{FbStartTime}</div>
			<div>{FbContent}</div>
			<div>{FbBtns}</div>
		</div>
	);
};

interface FbContentProps {
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	readOnly?: boolean;
}
const FbContent = ({ value, onChange, readOnly }: FbContentProps) => {
	return <textarea value={value} readOnly={readOnly} onChange={onChange} />;
};
const FbContentType = (<FbContent />).type;

const FbStartTime = ({ children }: { children?: React.ReactNode }) => {
	return <div>{children}</div>;
};
const FbStartTimeType = (<FbStartTime />).type;

const FbBtnStyle = css`
	width: 80px;
`;
const FbBtn = ({
	children,
	onClick,
}: {
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLElement>;
}) => {
	return (
		<button css={FbBtnStyle} onClick={onClick}>
			{children}
		</button>
	);
};
const FbBtnType = (<FbBtn />).type;

export const FeedbackBox = Object.assign(forwardRef(FbMain), {
	Content: FbContent,
	StartTime: FbStartTime,
	Btn: FbBtn,
});
