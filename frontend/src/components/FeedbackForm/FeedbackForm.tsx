import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import useAddFeedback from '@hooks/useAddFeedback';
import { currentVideoTimeState } from '@store/currentVideoTime.store';

import { ONE_SECOND } from '@constants/time.constant';
import { mmssFormatter } from '@utils/common.util';

import {
	fbFormWrapperStyle,
	fbInputStyle,
	fbFormStartTimeStyle,
	fbInputWrapperStyle,
} from './FeedbackForm.style';

const FeedbackForm = () => {
	const [inputVal, setInputVal] = useState('');
	const [startTime, setStartTime] = useState(0);

	const currentVideoTime = useRecoilValue(currentVideoTimeState);
	const { handleAddFeedback } = useAddFeedback();
	const ENTER_KEY_CODE = 13;

	const handleChange = (e) => {
		if (!inputVal.length) setStartTime(currentVideoTime);
		setInputVal(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === ENTER_KEY_CODE && !e.shiftKey) addFeedback(e);
	};

	const addFeedback = (e) => {
		e.preventDefault();
		handleAddFeedback({ startTime, inputVal });
		setInputVal('');
	};

	return (
		<div css={fbFormWrapperStyle}>
			<div css={fbFormStartTimeStyle}>
				{mmssFormatter((inputVal ? startTime : currentVideoTime) * ONE_SECOND)}
			</div>
			<div css={fbInputWrapperStyle}>
				<textarea
					value={inputVal}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					css={fbInputStyle}
				/>
			</div>
		</div>
	);
};

export default React.memo(FeedbackForm);
