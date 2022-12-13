import { EVENT, EXCEPTION_MESSAGE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { User, userUUID } from '@types';
import { Namespace, Socket } from 'socket.io';
import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { ChatRequestDto, ChatResponseDto, ChatTarget } from 'src/room/dto/chat.dto';
import { RoomRepository } from 'src/room/repository/room.repository';

@Injectable()
export class ChatService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	async handleChat({
		client,
		server,
		chatRequestDto,
	}: {
		client: Socket;
		server: Namespace;
		chatRequestDto: ChatRequestDto;
	}) {
		const targetIds: userUUID[] = await this.getChatTargetIds({
			client,
			chatRequestDto,
		});

		const chatResponse = new ChatResponseDto(chatRequestDto);
		targetIds.forEach((targetId: userUUID) => {
			server.to(targetId).emit(EVENT.RECEIVE_MESSAGE, { data: { chat: chatResponse } });
		});

		return {};
	}

	async getChatTargetIds({
		client,
		chatRequestDto,
	}: {
		client: Socket;
		chatRequestDto: ChatRequestDto;
	}) {
		const { target, role, uuid } = chatRequestDto;

		const sender = await this.roomRepository.getUserByClientId(client.id);
		const users = await this.roomRepository.getUsersInRoom(sender.roomUUID);
		const others = users.filter((member) => sender.uuid !== member.uuid);

		switch (target) {
			case ChatTarget.EVERYONE:
				return others.map((user) => user.clientId);
			case ChatTarget.ROLE:
				if (role) {
					return others
						.filter((other) => other.role === role)
						.map((user) => user.clientId);
				}
			case ChatTarget.DRIECT:
				if (uuid) {
					const target = await this.roomRepository.getUserByUserId(uuid);
					return [target.clientId];
				}
			default:
				throw new WsException(EXCEPTION_MESSAGE.INVALID_CHAT_DATA);
		}
	}
}
