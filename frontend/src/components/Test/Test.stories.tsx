import React from 'react';
import { Story } from '@storybook/react';
import Test, { TestPropType } from './Test';

export default {
	component: Test,
	title: 'Test',
};

const Template: Story<TestPropType> = (args) => <Test {...args} />;

export const Default = Template.bind({});
Default.args = {
	text: 'test text',
};

export const Error = Template.bind({});
Error.args = {
	text: 'Error',
};
