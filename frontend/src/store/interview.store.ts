import { atom, selector } from 'recoil';
import { meInRoomState, othersInRoomState } from './room.store';

export const docsUUIDState = atom({
	key: 'docsUUIDState',
	default: null,
});

export const completedFbCntState = atom({
	key: 'completedFbCntState',
	default: 0,
});

export const userRoleSelector = selector({
	key: 'userRoleSelector',
	get: ({ get }) => {
		const totalUser = [get(meInRoomState), ...get(othersInRoomState)];

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
