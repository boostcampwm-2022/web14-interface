import React from 'react';

import useEditFeedback from '@hooks/useEditFeedback';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { ReactComponent as CheckIcon } from '@assets/icon/check.svg';
import { iconSxStyle } from '@styles/commonStyle';
import { fbBtnContainer } from './FeedbackEditBtns.style';

interface Props {
	id: string;
	readOnly: boolean;
}

const FeedbackEditBtn = ({ id, readOnly }: Props) => {
	const { handleStartEditFeedback, handleEndEditFeedback, handleDeleteFeedback } =
		useEditFeedback(id);

	return (
		<div css={fbBtnContainer}>
			{readOnly ? (
				<button onClick={handleStartEditFeedback}>
					<EditIcon {...iconSxStyle} fill="black" />
				</button>
			) : (
				<button onClick={handleEndEditFeedback}>
					<CheckIcon {...iconSxStyle} fill="black" />
				</button>
			)}
			<button onClick={handleDeleteFeedback}>
				<DeleteIcon {...iconSxStyle} fill="black" />
			</button>
		</div>
	);
};

export default FeedbackEditBtn;
