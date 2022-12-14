import { REST_SERVER_ORIGIN } from '@constant';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { Socket } from 'socket.io';

export const setUserIdInClient = async (client: Socket) => {
	try {
		const res = await axios.get(`${process.env[REST_SERVER_ORIGIN]}/api/auth/id`, {
			headers: {
				Cookie: client.handshake.headers.cookie,
			},
		});
		client.data.authId = res.data.data.userId;
	} catch (err) {
		errerLogger(err);
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
		errerLogger(err);
	}
};

const errerLogger = (err) => {
	const logger = new Logger('Rest Exception');
	const { message }: any = err.response.data;
	logger.error(message);
};
