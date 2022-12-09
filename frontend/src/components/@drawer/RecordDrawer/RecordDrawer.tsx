import React from 'react';

import DocsItem from '@components/DocsItem/DocsItem';
import { docsListQuery } from '@store/interviewDocs.store';
import { roomUUIDState } from '@store/room.store';

import { useRecoilValue } from 'recoil';

const RecordDrawer = () => {
	const roomUUID = useRecoilValue(roomUUIDState);
	const docsList = useRecoilValue(docsListQuery(roomUUID));

	return (
		<>
			{docsList.map((docs, idx) => (
				<DocsItem key={docs.id} docs={docs} idx={idx} style="card" />
			))}
		</>
	);
};

export default RecordDrawer;
