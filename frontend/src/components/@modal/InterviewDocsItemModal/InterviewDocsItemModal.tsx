import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { useRecoilValue } from 'recoil';
import { docsItemQuery } from '@store/interviewDocs.store';

interface Props {
	docsUUID: string;
}

const InterviewDocsItemModal = ({ docsUUID }: Props) => {
	const docsItem = useRecoilValue(docsItemQuery(docsUUID));
	console.log(docsItem);
	return <Modal>InterviewDocsItemModal</Modal>;
};

export default InterviewDocsItemModal;
