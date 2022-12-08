import React from 'react';
import { Story } from '@storybook/react';
import DocsItem, { Props } from './DocsItem';

export default {
	component: DocsItem,
	title: '@shared/DocsItem',
};

const Template: Story<Props> = (args) => <DocsItem {...args} />;
const dummyDocs = { docsUUID: 'asdf', createdAt: new Date(), playTime: 20000 };

export const Card = Template.bind({});
Card.args = {
	docs: dummyDocs,
	idx: 1,
	style: 'card',
};

export const List = Template.bind({});
List.args = {
	docs: dummyDocs,
	idx: 1,
	style: 'list',
};
