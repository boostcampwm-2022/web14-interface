import { REST_TYPE } from '@constants/rest.constant';
import { SC_TYPE } from '@constants/statusCode.constants';
import { DocsItemDtoType, DocsResDtoType } from '@customType/dto';
import axios from 'axios';
import { selectorFamily } from 'recoil';

export const docsListQuery = selectorFamily<DocsItemDtoType[], string>({
	key: 'docsListQuery',
	get: (roomUUID) => async () => {
		try {
			const params = { 'room-uuid': roomUUID };
			const {
				status,
				data: { data: DocsItemDtoList },
			} = await axios.get(REST_TYPE.INTERVIEW_DOCS_LIST, { params });

			if (status === SC_TYPE.OK)
				return DocsItemDtoList.map((DocsItemDtoItem) => {
					return {
						...DocsItemDtoItem,
						createdAt: new Date(DocsItemDtoItem.createdAt).toLocaleString(),
					};
				});
		} catch (e) {
			console.log(e);
		}
	},
});

export const docsItemQuery = selectorFamily<DocsResDtoType, string>({
	key: 'docsItemQuery',
	get: (docsUUID) => async () => {
		try {
			const {
				status,
				data: { data: DocsDetail },
			} = await axios.get(REST_TYPE.INTERVIEW_DOCS + `/${docsUUID}`);

			if (status === SC_TYPE.OK)
				return {
					...DocsDetail,
					createdAt: new Date(DocsDetail.createdAt).toLocaleString(),
				};
		} catch (e) {
			console.log(e);
		}
	},
});
