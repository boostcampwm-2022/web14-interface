import React from 'react';
import { Story } from '@storybook/react';
import RoundButton, { roundButtonPropType } from './RoundButton';
import { ReactComponent as FolderIcon } from '@assets/icon/folder.svg';
import { iconSmStyle } from '@styles/commonStyle';
import theme from '@styles/theme';

export default {
	component: RoundButton,
	title: '@shared/RoundButton',
};

const Template: Story<roundButtonPropType> = (args) => (
	<RoundButton {...args}>
		<span>Button</span>
	</RoundButton>
);
export const Default = Template.bind({});
Default.args = {
	style: { width: 500, size: 'medium', color: 'primary' },
};

const IconTemplate: Story<roundButtonPropType> = (args) => (
	<RoundButton {...args}>
		<FolderIcon {...iconSmStyle} />
		<span>Button</span>
	</RoundButton>
);
export const IconButton = IconTemplate.bind({});
IconButton.args = {
	style: { width: 200, size: 'medium', color: 'primary' },
};

const IconOnlyTemplate: Story<roundButtonPropType> = (args) => (
	<RoundButton {...args}>
		<FolderIcon {...iconSmStyle} />
	</RoundButton>
);
export const IconOnlyButton = IconOnlyTemplate.bind({});
IconOnlyButton.args = {
	style: { size: 'medium', color: 'primary' },
};
