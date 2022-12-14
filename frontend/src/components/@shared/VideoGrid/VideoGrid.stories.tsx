import React from 'react';
import { Story } from '@storybook/react';
import VideoGrid, { VideoGridPropType } from './VideoGrid';
import StreamVideo from '../StreamingVideo/StreamVideo';

export default {
	component: VideoGrid,
	title: '@shared/VideoGrid',
};

const Template: Story<VideoGridPropType> = (args, { loaded: { MediaStram } }) => (
	<VideoGrid {...args}>
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
		<StreamVideo {...MediaStram} />
	</VideoGrid>
);

export const Default = Template.bind({});
const getMedia = async () => {
	return new Promise((resolve, reject) => {
		const myStream = navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});

		resolve(myStream);
	});
};
Default.loaders = [
	async () => ({
		MediaStram: { src: await getMedia(), nickname: 'user1', muted: true },
	}),
];
