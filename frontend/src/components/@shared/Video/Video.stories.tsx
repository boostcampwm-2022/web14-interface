import React from 'react';
import { Story } from '@storybook/react';
import Video, { VideoPropType } from './Video';

export default {
	component: Video,
	title: 'Video',
};

const Template: Story<VideoPropType> = (args, { loaded: { MediaStram } }) => (
	<Video {...args} {...MediaStram} />
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
	return new Promise((resolve, reject) => {
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
