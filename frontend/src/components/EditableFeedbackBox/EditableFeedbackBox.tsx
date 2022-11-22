import React, { useEffect, useState } from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import { EditableFeedbackType } from '@customType/common';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';

interface PropsType {
	feedback: EditableFeedbackType;
	handleClickFeedback: (e, startTime: number, idx: number) => void;
	handleDeleteFeedback: (id: number) => void;
	handleStartEditFeedback: (id: number) => void;
	handleEndEditFeedback: (id: number, newContent: string) => void;

	feedbackRef: React.MutableRefObject<any[]>;
	idx: number;
}
const EditableFeedbackBox = (props: PropsType) => {
	const {
		feedback,
		handleClickFeedback,
		handleDeleteFeedback,
		handleStartEditFeedback,
		handleEndEditFeedback,
		feedbackRef,
		idx,
	} = props;
	const { id, startTime, content, readOnly } = feedback;

	const [editableContent, setEditableContent] = useState('');
	useEffect(() => {
		setEditableContent(content);
	}, [feedback]);

	return (
		<FeedbackBox
			onClick={(e) => handleClickFeedback(e, startTime, idx)}
			ref={(elem) => (feedbackRef.current[idx] = elem)}
		>
			<FeedbackBox.StartTime>{startTime}</FeedbackBox.StartTime>
			<FeedbackBox.Content
				value={editableContent}
				onChange={(e) => setEditableContent(e.target.value)}
				readOnly={readOnly}
			/>
			<FeedbackBox.Btn onClick={() => handleDeleteFeedback(id)}>
				<DeleteIcon width={20} />
			</FeedbackBox.Btn>
			<FeedbackBox.Btn>
				{readOnly ? (
					<EditIcon onClick={() => handleStartEditFeedback(id)} width={20} />
				) : (
					<button onClick={() => handleEndEditFeedback(id, editableContent)}>
						수정완료
					</button>
				)}
			</FeedbackBox.Btn>
		</FeedbackBox>
	);
};

export default React.memo(EditableFeedbackBox);
