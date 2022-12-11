import React from 'react';
import { Story } from '@storybook/react';
import RoomInfoModal, { RoomInfoModelPropType } from './RoomInfoModal';

export default {
	component: RoomInfoModal,
	title: '@modal/RoomInfoModal',
};

const Template: Story<RoomInfoModelPropType> = (args) => <RoomInfoModal {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: '1234-1234-5678-9012',
};
