import React from 'react';
import { Story } from '@storybook/react';
import StartInterviewModal, { StartInterviewModalPropType } from './StartInterviewModal';

export default {
	component: StartInterviewModal,
	title: '@modal/StartInterviewModal',
};

const Template: Story<StartInterviewModalPropType> = (args) => <StartInterviewModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
