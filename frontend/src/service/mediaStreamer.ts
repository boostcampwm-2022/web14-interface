import { socket } from './socket';
import { ONE_SECOND } from '@constants/time.constant';
import { socketEmit } from '@api/socket.api';

const mediaStreamer = () => {
	let mediaRecorder: MediaRecorder;

	const startStream = (mediaStream: MediaStream) => {
		mediaRecorder = new MediaRecorder(mediaStream, {
			mimeType: 'video/webm; codecs=vp9',
		});
		console.log('start stream');

		mediaRecorder.ondataavailable = async (e) => {
			if (!e.data || !e.data.size) return;
			socket.emit('stream_video', await e.data.arrayBuffer());
		};

		mediaRecorder.onstop = () => {
			mediaRecorder = null;
		};

		mediaRecorder.start(ONE_SECOND);
	};

	const stopStream = (docsUUID: string) => {
		if (mediaRecorder) {
			mediaRecorder.stop();
			socketEmit('finish_streaming', docsUUID);
		}
	};

	return { startStream, stopStream };
};

export default mediaStreamer;
