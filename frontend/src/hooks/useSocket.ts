import useToast, { TOAST_TYPE } from '@hooks/useToast';
import { socket } from '@service/socket';
import { findToastMessage } from '@utils/common.util';

interface socketResponseType<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export const useSocket = () => {
	const { popToast } = useToast();

	const socketEmit = <T>(event, data?) => {
		return new Promise<T>((resolve, reject) => {
			socket.emit(event, data, ({ success, data, message }: socketResponseType<T>) => {
				console.log('socket.api', success, data, message);

				if (!success) {
					const toastMessage = findToastMessage(message);
					if (toastMessage) popToast(toastMessage, TOAST_TYPE.ERROR);

					return reject({ success, message });
				}

				resolve(data);
			});
		});
	};

	return { socketEmit };
};

export default useSocket;
