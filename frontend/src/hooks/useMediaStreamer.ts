import { ONE_SECOND } from '@constants/time.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useSocket from '@hooks/useSocket';
import useModal from '@hooks/useModal';

interface socketResponseType {
	success: boolean;
	message?: string;
}

const useMediaStreamer = () => {
	const { openModal } = useModal();
	const { socketEmit } = useSocket();
	let mediaRecorder: MediaRecorder;

	const stopStream = () => {
		if (mediaRecorder) mediaRecorder.stop();
	};

	const startStream = (mediaStream: MediaStream) => {
		mediaRecorder = new MediaRecorder(mediaStream, {
			mimeType: 'video/webm; codecs=vp9',
		});

		mediaRecorder.ondataavailable = async (e) => {
			if (!e.data || !e.data.size) return;
			try {
				await socketEmit<socketResponseType>(
					SOCKET_EVENT_TYPE.STREAM_VIDEO,
					await e.data.arrayBuffer()
				);
			} catch (e) {
				stopStream();
				openModal('TimeOverAlertModal');
			}
		};

		mediaRecorder.onstop = () => {
			mediaRecorder = null;
		};

		mediaRecorder.start(ONE_SECOND);
	};

	return { startStream, stopStream };
};

export default useMediaStreamer;
