import { meInRoomState, othersInRoomState, roomUUIDState } from '@store/room.store';
import { webRTCUserMapState } from '@store/webRTC.store';
import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import useCleanupInterview from './useCleanupInterview';

const useCleanupRoom = () => {
	const cleanupInterview = useCleanupInterview();
	const roomUUIDRefresher = useResetRecoilState(roomUUIDState);
	const ohtersRefresher = useResetRecoilState(othersInRoomState);
	const meRefresher = useResetRecoilState(meInRoomState);
	const webRTCUserMapRefresher = useResetRecoilState(webRTCUserMapState);

	const cleanupRoom = useCallback(() => {
		console.log('cleanup room');
		roomUUIDRefresher();
		ohtersRefresher();
		meRefresher();
		webRTCUserMapRefresher();

		cleanupInterview();
	}, []);

	return cleanupRoom;
};

export default useCleanupRoom;
