import React, { useState } from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';

const initialTimeline = [
	{ id: '1', startTime: 1, endTime: 2, content: '목소리가 조으시네용' },
	{ id: '2', startTime: 2, endTime: 3, content: '눈빛이 조으시네용' },
	{ id: '3', startTime: 3, endTime: 4, content: '이부분은 더 자세한 설명이 필요해보입니다.' },
	{ id: '4', startTime: 5, endTime: 6, content: '목소리가 조으시네용' },
	{ id: '5', startTime: 6, endTime: 7, content: '목소리가 조으시네용' },
	{ id: '6', startTime: 8, endTime: 9, content: '이부분은 더 자세한 설명이 필요해보입니다.' },
	{ id: '7', startTime: 10, endTime: 11, content: '조으시네용' },
	{ id: '8', startTime: 11, endTime: 12, content: '이부분은 더 자세한 설명이 필요해보입니다.' },
	{ id: '9', startTime: 13, endTime: 14, content: '목소리가 조으시네용' },
];

interface FeedbackType {
	id: string;
	startTime: number;
	endTime: number;
	content: string;
}

const Timeline = () => {
	const [timeline, setTimeline] = useState<FeedbackType[]>(initialTimeline);

	return (
		<>
			{timeline.map(({ id, content, startTime }) => (
				<FeedbackBox key={id}>
					<FeedbackBox.Content>{content}</FeedbackBox.Content>
					<FeedbackBox.StartTime>{startTime}</FeedbackBox.StartTime>
				</FeedbackBox>
			))}
			<EditIcon width={20} />
		</>
	);
};

export default Timeline;
