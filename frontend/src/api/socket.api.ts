import { socket } from '@service/socket';

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
				//TODO 여기서 에러 처리
				//모달을 띄우던 -> useModal
				//NOT Found 같은 에러 페이지로 이동 하던. -> throw Error -> React Error Boundary
				alert(message);
				return reject({ success, message });
			}

			resolve(data);
		});
	});
};
