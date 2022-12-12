import React, { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useEditFeedback from '@hooks/useEditFeedback';
import { isFbClickedState, isFbSyncState } from '@store/feedback.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';

import {
	fbTextAreaStyle,
	fbStartTimeStyle,
	feedbackBoxStyle,
	feedbackContentStyle,
	feedbackContentAreaStyle,
} from './FeedbackItem.style';

import { FeedbackItemType } from '@customType/feedback';
import { mmssFormatter } from '@utils/common.util';
import { ONE_SECOND } from '@constants/time.constant';
import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export interface FeedbackItemPropType {
	feedback: FeedbackItemType;
	//TODO ref type any
	feedbackRef: React.MutableRefObject<any[]>;
	index: number;
	editableBtns: React.ReactNode;
}
const FeedbackItem = ({ feedback, feedbackRef, index, editableBtns }: FeedbackItemPropType) => {
	const isFbSync = useRecoilValue(isFbSyncState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeState);
	const { handleFbChange } = useEditFeedback(feedback.id);

	const { startTime, isFirst, content, readOnly } = feedback;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setIsFbClicked(true);
		setCurrentVideoTime(startTime);
	};

	return (
		<div ref={(el) => (feedbackRef.current[index] = el)} css={feedbackBoxStyle}>
			<div css={fbStartTimeStyle} style={{ visibility: isFirst ? 'visible' : 'hidden' }}>
				{mmssFormatter(startTime * ONE_SECOND)}
			</div>
			<div css={feedbackContentAreaStyle} onClick={handleClickFeedback}>
				<div css={feedbackContentStyle} contentEditable={!readOnly}>
					{content}
				</div>
				{editableBtns}
			</div>
		</div>
	);
};

export default React.memo(FeedbackItem);
