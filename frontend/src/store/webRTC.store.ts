import { atom, selector } from 'recoil';
import { meInRoomState, othersInRoomState } from './room.store';

export const webRTCUserMapState = atom({
	key: 'webRTCUserMapState',
	default: new Map(),
});

export const userInfoSelector = selector({
	key: 'webRTCStreamSelector',
	get: ({ get }) => {
		return Array.from(get(webRTCUserMapState).entries()).map((userInfo) => {
			const [uuid, { connection, stream }] = userInfo;
			const targetUser = get(othersInRoomState).find((user) => user.uuid === uuid);
			if (!targetUser) return { ...get(meInRoomState), connection, stream };

			return { ...targetUser, connection, stream };
		});
	},
});

export const userRoleSelector = selector({
	key: 'userRoleSelector',
	get: ({ get }) => {
		const totalUser = get(userInfoSelector);

		return totalUser.reduce(
			(acc, cur) => {
				if (cur.role === 'interviewee') acc.interviewee = cur;
				else acc.interviewerList.push(cur);

				return acc;
			},
			{ interviewee: null, interviewerList: [] }
		);
	},
});
