import { socket } from '@service/socket';
import { getToatMessage } from '@utils/common.util';

interface socketResponseType<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export const socketEmit = <T>(event, data?) => {
	return new Promise<T>((resolve, reject) => {
		socket.emit(event, data, ({ success, data, message }: socketResponseType<T>) => {
			console.log('socket.api', success, data, message);

			if (!success) {
				getToatMessage(message);

				return reject({ success, message });
			}

			resolve(data);
		});
	});
};
