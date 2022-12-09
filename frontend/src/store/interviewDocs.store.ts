import { REST_TYPE } from '@constants/rest.constant';
import { SC_TYPE } from '@constants/statusCode.constants';
import { DocsItemDtoType } from '@customType/dto';
import axios from 'axios';
import { selectorFamily } from 'recoil';

export const docsListQuery = selectorFamily<DocsItemDtoType[], string>({
	key: 'docsListQuery',
	get: (roomUUID) => async () => {
		try {
			const params = { 'room-uuid': roomUUID };
			const res = await axios.get(REST_TYPE.INTERVIEW_DOCS_LIST, { params });

			if (res.status === SC_TYPE.OK) return res.data.data;
		} catch (e) {
			console.log(e);
		}
	},
});
