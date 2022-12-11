import React from 'react';
import { Story } from '@storybook/react';
import ExitRoomModal from './ExitRoomModal';

export default {
	component: ExitRoomModal,
	title: '@modal/ExitRoomModal',
};

const Template: Story<any> = (args) => <ExitRoomModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
