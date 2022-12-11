import { ROLE_TYPE } from '@constants/role.constant';
import { UserType } from '@customType/user';
import { meInRoomState, othersInRoomState } from '@store/user.store';
import { useRecoilState } from 'recoil';

export const useUserRole = () => {
	const [me, setMe] = useRecoilState<UserType>(meInRoomState);
	const [others, setOthers] = useRecoilState<UserType[]>(othersInRoomState);

	const setUserRole = (interviewee) => {
		const newOthers = others.map((user) => {
			return user.uuid === interviewee.uuid
				? { ...user, role: ROLE_TYPE.INTERVIEWEE }
				: { ...user, role: ROLE_TYPE.INTERVIEWER };
		});

		setOthers(newOthers);
		setMe({
			...me,
			role: interviewee.uuid === me.uuid ? ROLE_TYPE.INTERVIEWEE : ROLE_TYPE.INTERVIEWER,
		});
	};

	const resetUserRole = () => {
		const newOthers = others.map((user) => {
			return { ...user, role: ROLE_TYPE.NONE };
		});

		setOthers(newOthers);
		setMe({ ...me, role: ROLE_TYPE.NONE });
	};

	return { setUserRole, resetUserRole };
};
