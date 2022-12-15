import { roomUUIDState } from '@store/room.store';
import { meInRoomState, othersInRoomState, webRTCUserMapState } from '@store/user.store';
import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import useCleanupInterview from './useCleanupInterview';

const useCleanupRoom = () => {
	const cleanupInterview = useCleanupInterview();
	const roomUUIDRefresher = useResetRecoilState(roomUUIDState);
	const othersRefresher = useResetRecoilState(othersInRoomState);
	const meRefresher = useResetRecoilState(meInRoomState);
	const webRTCUserMapRefresher = useResetRecoilState(webRTCUserMapState);

	const cleanupRoom = useCallback(() => {
		console.log('cleanup room');
		roomUUIDRefresher();
		othersRefresher();
		meRefresher();
		webRTCUserMapRefresher();

		cleanupInterview();
	}, []);

	return cleanupRoom;
};

export default useCleanupRoom;
