import { repositoryType } from 'src/types/room.type';

export class InmemoryRoomRepository implements RoomRepository<repositoryType> {
	repository;
	createRoom(uuid: string) {
		this.repository[uuid] = {};
	}
	enterRoom(): void {
		return;
	}
}
