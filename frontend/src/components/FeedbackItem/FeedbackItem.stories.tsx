import React from 'react';
import { Story } from '@storybook/react';
import FeedbackItem, { Props } from './FeedbackItem';
import FeedbackEditBtn from '@components/FeedbackEditBtns/FeedbackEditBtns';

export default {
	component: FeedbackItem,
	title: 'FeedbackItem',
};

const Template: Story<Props> = (args: Props) => <FeedbackItem {...args} />;

const dummyFeedback = {
	id: 'id',
	startTime: 500,
	innerIndex: 4,
	content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
	readonly: true,
	isFirst: true,
};
const dummyFbItem = {
	feedback: dummyFeedback,
	feedbackRef: false,
	index: 3,
	editableBtns: <FeedbackEditBtn id="id" readOnly={true} />,
};

export const Default = Template.bind({});
Default.args = { ...dummyFbItem, editableBtns: false };

export const Editable = Template.bind({});
Editable.args = dummyFbItem;
