import { REST_SERVER_ORIGIN } from '@constant';
import axios from 'axios';
import { Socket } from 'socket.io';

export const setUserIdInClient = async (client: Socket): Promise<string> => {
	try {
		const res = await axios.get(`${process.env[REST_SERVER_ORIGIN]}/api/auth/id`, {
			headers: {
				Cookie: client.handshake.headers.cookie,
			},
		});
		client.data.userId = res.data.data.userId;
	} catch (err) {
		// not handle 401 error
	}
	return '';
};
