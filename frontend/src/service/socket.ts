import { io } from 'socket.io-client';

export const socket = io(`ws://localhost:3000/`, {
	transports: ['websocket'],
});
