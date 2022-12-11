import React from 'react';
import { Story } from '@storybook/react';
import StreamVideo, { StreamVideoPropType } from './StreamVideo';

export default {
	component: StreamVideo,
	title: '@shared/Video/StreamVideo',
};

const Template: Story<StreamVideoPropType> = (args, { loaded: { MediaStram } }) => (
	<StreamVideo {...args} {...MediaStram} />
);

const getMedia = async () => {
	return new Promise((resolve, reject) => {
		const myStream = navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});

		resolve(myStream);
	});
};
export const Default = Template.bind({});
Default.args = {
	nickname: 'User1',
	controls: true,
	muted: true,
};
Default.loaders = [
	async () => ({
		MediaStram: { src: await getMedia() },
	}),
];
