import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { useRecoilValue } from 'recoil';
import { docsListQuery } from '@store/interviewDocs.store';
import DocsItem from '@components/InterviewDocsItem/InterviewDocsItem';
import Button from '@components/@shared/Button/Button';
import {
	docsListBodyStyle,
	docsListHeaderStyle,
	docsListWrapperStyle,
} from './InterviewDocsListModal.style';

const InterviewDocsListModal = () => {
	const docsList = useRecoilValue(docsListQuery(''));
	return (
		<Modal>
			<div css={docsListWrapperStyle}>
				<div css={docsListHeaderStyle}>
					<div>인터뷰 기록</div>
					<Button size="small">닫기</Button>
				</div>
				<div css={docsListBodyStyle}>
					{docsList.map((docs, idx) => (
						<DocsItem key={docs.id} docs={docs} idx={idx} style="list" />
					))}
				</div>
			</div>
		</Modal>
	);
};

export default InterviewDocsListModal;
