import { socket } from '../service/socket';
import { ONE_SECOND } from '@constants/time.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { socketEmit } from '@api/socket.api';
import useModal from '@hooks/useModal';

interface socketResponseType {
	success: boolean;
	message?: string;
}

const useMediaStreamer = () => {
	const { openModal } = useModal();
	let mediaRecorder: MediaRecorder;

	const startStream = (mediaStream: MediaStream) => {
		mediaRecorder = new MediaRecorder(mediaStream, {
			mimeType: 'video/webm; codecs=vp9',
		});

		mediaRecorder.ondataavailable = async (e) => {
			let alertFlag = false;

			if (!e.data || !e.data.size) return;
			const { success } = await socketEmit<socketResponseType>(
				SOCKET_EVENT_TYPE.STREAM_VIDEO,
				await e.data.arrayBuffer()
			);

			if (!alertFlag && !success) {
				alertFlag = true;
				openModal('TimeOverAlertModal');
			}
		};

		mediaRecorder.onstop = () => {
			mediaRecorder = null;
		};

		mediaRecorder.start(ONE_SECOND);
	};

	const stopStream = () => {
		if (mediaRecorder) mediaRecorder.stop();
	};

	return { startStream, stopStream };
};

export default useMediaStreamer;
