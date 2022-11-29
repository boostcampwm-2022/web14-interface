import { socket } from './socket';
import { ONE_SECOND } from '@constants/time.constant';

const mediaRecorder = () => {
	let mediaRecorder: MediaRecorder;

	const startRecord = (mediaStream: MediaStream) => {
		mediaRecorder = new MediaRecorder(mediaStream, {
			mimeType: 'video/webm; codecs=vp9',
		});

		mediaRecorder.ondataavailable = (e) => {
			if (e.data && e.data.size > 0) {
				socket.emit('stream_video', {
					timestamp: new Date().getTime(),
					data: e.data,
				});
			}
		};

		mediaRecorder.onstop = () => {
			socket.emit('finish_streaming');
		};

		mediaRecorder.start(ONE_SECOND);
	};

	const stopRecord = () => {
		if (mediaRecorder) mediaRecorder.stop();
	};

	return { startRecord, stopRecord };
};

export default mediaRecorder;
