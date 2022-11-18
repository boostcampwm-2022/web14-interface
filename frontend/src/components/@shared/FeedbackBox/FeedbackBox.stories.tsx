import React from 'react';
import { Story } from '@storybook/react';
import { FeedbackBox } from './FeedbackBox';

import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';

export default {
	title: 'FeedbackBox',
};

interface FeedbackDefaultPropType {
	startTime: number;
	content: string;
}
const TemplateDefault: Story<FeedbackDefaultPropType> = (args) => (
	<FeedbackBox>
		<FeedbackBox.StartTime>{args.startTime}</FeedbackBox.StartTime>
		<FeedbackBox.Content value={args.content} />
	</FeedbackBox>
);
export const Default = TemplateDefault.bind({});
Default.args = {
	startTime: 0,
	content: '좋았어요~',
};

interface FeedbackWithBtnsPropType extends FeedbackDefaultPropType {
	editIcon?: React.ReactNode;
	deleteIcon?: React.ReactNode;
}
const TemplateWithBtns: Story<FeedbackWithBtnsPropType> = (args) => (
	<FeedbackBox>
		<FeedbackBox.StartTime>{args.startTime}</FeedbackBox.StartTime>
		<FeedbackBox.Content value={args.content} />
		<FeedbackBox.Btn>{args.editIcon}</FeedbackBox.Btn>
		<FeedbackBox.Btn>{args.deleteIcon}</FeedbackBox.Btn>
	</FeedbackBox>
);
export const Btns = TemplateWithBtns.bind({});
Btns.args = {
	startTime: 6,
	content: '감사합니다.',
	editIcon: <EditIcon width={15} />,
	deleteIcon: <DeleteIcon width={15} />,
};
