import { ROLE_TYPE } from '@constants/role.constant';

export interface UserType {
	uuid: string;
	nickname: string;
	role: ROLE_TYPE;
	roomUUID: string;
	audio: boolean;
	video: boolean;
}
