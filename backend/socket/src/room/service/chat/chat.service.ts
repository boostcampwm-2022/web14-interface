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
		const user = await this.roomRepository.getUserByClientId(client.id);
		const users = await this.roomRepository.getUsersInRoom(user.roomUUID);

		const targetIds: userUUID[] = this.getChatTargetIds({
			others: users.filter((member) => user.uuid !== member.uuid),
			chatRequestDto,
		});

		const chatResponse = new ChatResponseDto(chatRequestDto);
		targetIds.forEach((targetId: userUUID) => {
			server.to(targetId).emit(EVENT.RECEIVE_MESSAGE, { data: { chat: chatResponse } });
		});

		return {};
	}

	getChatTargetIds({
		others,
		chatRequestDto,
	}: {
		others: User[];
		chatRequestDto: ChatRequestDto;
	}) {
		const { target, role, uuid } = chatRequestDto;

		switch (target) {
			case ChatTarget.EVERYONE:
				return others.map((user) => user.uuid);
			case ChatTarget.ROLE:
				if (role) {
					return others.filter((other) => other.role === role).map((user) => user.uuid);
				}
			case ChatTarget.DRIECT:
				if (uuid) {
					return [uuid];
				}
			default:
				throw new WsException(EXCEPTION_MESSAGE.INVALID_CHAT_DATA);
		}
	}
}
