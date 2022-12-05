import { UserDTO } from '@customType/user';
import { atom, selector } from 'recoil';

export const roomUUIDState = atom({
	key: 'roomUUIDState',
	default: null,
});

export const othersInRoomState = atom<UserDTO[]>({
	key: 'othersInRoomState',
	default: [],
});

export const meInRoomState = atom<UserDTO | null>({
	key: 'meInRoomState',
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
