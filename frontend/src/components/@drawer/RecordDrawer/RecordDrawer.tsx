import DocsItem from '@components/DocsItem/DocsItem';
import { REST_TYPE } from '@constants/rest.constant';
import { DocsItemDtoType } from '@customType/dto';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const initialDocsList = [
	{ docsUUID: 'asdf', createdAt: new Date(), playTime: 20000 },
	{ docsUUID: 'qwe', createdAt: new Date(), playTime: 454630 },
	{ docsUUID: 'zxc', createdAt: new Date(), playTime: 798760 },
	{ docsUUID: 'wer', createdAt: new Date(), playTime: 58760 },
];

const RecordDrawer = () => {
	const [docsList, setDocsList] = useState<DocsItemDtoType[]>(initialDocsList);
	// useEffect(() => {
	// 	const fetch = async () => {
	// 		const res = await axios.get(REST_TYPE.INTERVIEW_DOCS_LIST);
	// 		setDocsList(res.data);
	// 	};
	// 	fetch();
	// }, []);

	return (
		<>
			{docsList.map((docs, idx) => (
				<DocsItem key={docs.docsUUID} docs={docs} idx={idx} style='card' />
			))}
		</>
	);
};

export default RecordDrawer;
