import React from 'react';
import { Story } from '@storybook/react';
import TextField, { TextFieldPropType } from './TextField';

export default {
	component: TextField,
	title: '@shared/TextField',
};

const Template: Story<TextFieldPropType> = (args) => <TextField {...args}></TextField>;

export const Default = Template.bind({});
Default.args = {};

export const HelperText = Template.bind({});
HelperText.args = { helperText: 'this is helper text' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Error = Template.bind({});
Error.args = { error: true, helperText: 'this is helper text' };
