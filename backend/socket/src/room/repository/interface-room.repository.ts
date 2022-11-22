interface RoomRepository<T> {
	repository: T;
	createRoom(uuid: string): void;
	enterRoom(): void;
}
