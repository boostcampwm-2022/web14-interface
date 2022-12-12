import React from 'react';
import { Story } from '@storybook/react';
import Video, { VideoPropType } from './Video';

export default {
	component: Video,
	title: '@shared/Video/Video',
};

const Template: Story<VideoPropType> = (args, { loaded: { MediaStram } }) => (
	<Video {...args} {...MediaStram} />
);

export const Default = Template.bind({});
Default.args = {
	src: '/assets/test.mp4',
	width: '100%',
	autoplay: true,
	controls: true,
	muted: true,
};
