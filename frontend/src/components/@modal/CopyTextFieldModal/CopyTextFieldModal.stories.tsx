import React from 'react';
import { Story } from '@storybook/react';
import CopyTextFieldModal, { CopyTextFieldModalPropType } from './CopyTextFieldModal';

export default {
	component: CopyTextFieldModal,
	title: '@modal/CopyTextFieldModal',
};

const Template: Story<CopyTextFieldModalPropType> = (args) => <CopyTextFieldModal {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: '1234-1234-5678-9012',
};
