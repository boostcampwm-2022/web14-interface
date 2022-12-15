import React from 'react';
import { useRecoilValue } from 'recoil';
import { docsListQuery } from '@store/interviewDocs.store';
import DocsItem from '@components/InterviewDocsItem/InterviewDocsItem';
import { docsListWrapperStyle, emptyList } from './InterviewDocsList.style';
import { DocsInfoType } from '@components/@modal/InterviewDocsModal/InterviewDocsModal';

interface InterviewDocsListPropType {
	roomUUID: string;
	handleClickDocsItem: (docsInfo: DocsInfoType) => void;
}

const InterviewDocsList = ({ roomUUID = '', handleClickDocsItem }: InterviewDocsListPropType) => {
	const docsList = useRecoilValue(docsListQuery(roomUUID));

	return (
		<div css={docsListWrapperStyle}>
			{docsList?.length > 0 ? (
				docsList.map((docs, idx) => (
					<DocsItem
						key={docs.id}
						docs={docs}
						idx={idx + 1}
						style="list"
						handleClickDocsItem={handleClickDocsItem}
					/>
				))
			) : (
				<div css={emptyList}>기록된 인터뷰가 없습니다.</div>
			)}
		</div>
	);
};

export default InterviewDocsList;
