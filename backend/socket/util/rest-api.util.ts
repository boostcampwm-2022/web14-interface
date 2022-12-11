import { REST_SERVER_ORIGIN } from '@constant';
import { WsException } from '@nestjs/websockets';
import axios from 'axios';
import { Socket } from 'socket.io';

export const setUserIdInClient = async (client: Socket) => {
	try {
		const res = await axios.get(`${process.env[REST_SERVER_ORIGIN]}/api/auth/id`, {
			headers: {
				Cookie: client.handshake.headers.cookie,
			},
		});
		client.data.userId = res.data.data.userId;
	} catch (err) {
		// not handle http error
		throw new WsException(err);
	}
};

export const deleteInterviewDocs = async ({
	client,
	docsUUID,
}: {
	client: Socket;
	docsUUID: string;
}) => {
	try {
		await axios.delete(`${process.env[REST_SERVER_ORIGIN]}/api/interview/docs/${docsUUID}`, {
			headers: {
				Cookie: client.handshake.headers.cookie,
			},
		});
	} catch (err) {
		// not handle http error
		throw new WsException(err);
	}
};
