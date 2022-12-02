import React from 'react';
import { Story } from '@storybook/react';
import IntervieweeVideo from './IntervieweeVideo';
import { VideoPropType } from '@components/@shared/Video/Video';

export default {
	component: IntervieweeVideo,
	title: 'IntervieweeVideo',
};

const Template: Story<VideoPropType> = (args, { loaded: { MediaStram } }) => (
	<IntervieweeVideo {...args} {...MediaStram} />
);

export const Default = Template.bind({});
Default.args = {
	src: '/assets/test.mp4',
	width: 500,
	autoplay: true,
	controls: true,
	muted: true,
};

const getMedia = async () => {
	return new Promise((resolve) => {
		const myStream = navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});

		resolve(myStream);
	});
};

export const MediaStream = Template.bind({});
MediaStream.args = {
	width: 500,
	autoplay: true,
	controls: true,
	muted: true,
};
MediaStream.loaders = [
	async () => ({
		MediaStram: { src: await getMedia() },
	}),
];


export const ProvideCallback = Template.bind({});
ProvideCallback.args = {
	src: '/assets/test.mp4',
	width: 500,
	autoplay: true,
	controls: true,
	muted: true,
};
