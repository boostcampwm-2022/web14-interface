import React from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import { EditableFeedbackType } from '@customType/common';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';

interface PropsType {
	feedback: EditableFeedbackType;
	handleClickFeedback: (e, startTime: number) => void;
	handleDeleteFeedback: (id: number) => void;
	handleToggleEditFeedback: (id: number) => void;
	handleChangeFeedback: (e, id: number) => void;

	feedbackRef: React.MutableRefObject<any[]>;
	idx: number;
}
const EditableFeedbackBox = (props: PropsType) => {
	const {
		feedback,
		handleClickFeedback,
		handleDeleteFeedback,
		handleToggleEditFeedback,
		handleChangeFeedback,
		feedbackRef,
		idx,
	} = props;
	const { id, startTime, content, readOnly } = feedback;

	return (
		<FeedbackBox
			onClick={(e) => handleClickFeedback(e, startTime)}
			ref={(elem) => (feedbackRef.current[idx] = elem)}
		>
			<FeedbackBox.StartTime>{startTime}</FeedbackBox.StartTime>
			<FeedbackBox.Content
				value={content}
				onChange={(e) => handleChangeFeedback(e, id)}
				readOnly={readOnly}
			/>
			<FeedbackBox.Btn onClick={() => handleDeleteFeedback(id)}>
				<DeleteIcon width={20} />
			</FeedbackBox.Btn>
			<FeedbackBox.Btn onClick={() => handleToggleEditFeedback(id)}>
				{readOnly ? <EditIcon width={20} /> : '수정완료'}
			</FeedbackBox.Btn>
		</FeedbackBox>
	);
};

export default React.memo(EditableFeedbackBox);
