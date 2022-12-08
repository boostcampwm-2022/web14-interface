import React from 'react';

import useCrudFeedback from '@hooks/useCrudFeedback';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { ReactComponent as CheckIcon } from '@assets/icon/check.svg';
import { iconSmStyle } from '@styles/commonStyle';
import { fbBtnContainer } from './FeedbackEditBtns.style';

interface Props {
	id: string;
	readOnly: boolean;
}

const FeedbackEditBtn = ({ id, readOnly }: Props) => {
	const { handleStartEditFeedback, handleEndEditFeedback, handleDeleteFeedback } =
		useCrudFeedback(id);

	return (
		<div css={fbBtnContainer}>
			{readOnly ? (
				<button onClick={handleStartEditFeedback}>
					<EditIcon {...iconSmStyle} fill="black" />
				</button>
			) : (
				<button onClick={handleEndEditFeedback}>
					<CheckIcon {...iconSmStyle} fill="black" />
				</button>
			)}
			<button onClick={handleDeleteFeedback}>
				<DeleteIcon {...iconSmStyle} fill="black" />
			</button>
		</div>
	);
};

export default FeedbackEditBtn;
