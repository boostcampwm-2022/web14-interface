import React from 'react';
import { ReactComponent as RecordIcon } from '@assets/icon/record.svg';
import { secMMSSFormatter } from '@utils/common.util';
import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { useRecoilValue } from 'recoil';
import { recordLabelStyle } from './RecordTimeLabel.style';

const RecordTimeLabel = () => {
	const currentVideoTime = useRecoilValue(currentVideoTimeState);

	return (
		<div css={recordLabelStyle}>
			<RecordIcon />
			{secMMSSFormatter(currentVideoTime)}
		</div>
	);
};

export default RecordTimeLabel;
