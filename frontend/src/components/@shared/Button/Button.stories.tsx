import React from 'react';
import { Story } from '@storybook/react';
import Button, { buttonPropType } from './Button';
import { ReactComponent as FolderIcon } from '@assets/icon/folder.svg';

export default {
	component: Button,
	title: '@shared/Button',
};

const Template: Story<buttonPropType> = (args) => (
	<Button {...args}>
		<span>Button</span>
	</Button>
);

export const Default = Template.bind({});
Default.args = {};

const IconTemplate: Story<buttonPropType> = (args) => (
	<Button {...args}>
		<FolderIcon />
		<span>Button</span>
	</Button>
);

export const IconButton = IconTemplate.bind({});
IconButton.args = {};

const IconOnlyTemplate: Story<buttonPropType> = (args) => (
	<Button {...args}>
		<FolderIcon />
	</Button>
);

export const IconOnlyButton = IconOnlyTemplate.bind({});
IconButton.args = {};
