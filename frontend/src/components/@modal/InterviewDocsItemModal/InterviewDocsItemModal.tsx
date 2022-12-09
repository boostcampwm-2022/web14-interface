import React, { useState } from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { useRecoilValue } from 'recoil';
import { docsItemQuery } from '@store/interviewDocs.store';
import Button from '@components/@shared/Button/Button';
import Video from '@components/@shared/Video/Video';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import { getFirstLabeledFbList } from '@utils/common.util';
import {
	docsItemBodyStyle,
	docsItemBtnsStyle,
	docsItemFbAreaStyle,
	docsItemFbBtnsStyle,
	docsItemHeaderStyle,
	docsItemWrapperStyle,
	docsItemVideoAreaStyle,
	docsItemVideoInfoStyle,
	docsItemFbListStyle,
} from './InterviewDocsItemModal.style';

interface Props {
	docsUUID: string;
	idx: number;
}

const InterviewDocsItemModal = ({ docsUUID, idx }: Props) => {
	const docsItem = useRecoilValue(docsItemQuery(docsUUID));
	const { createdAt, videoPlayTime, feedbacks } = docsItem;
	const createdAtDate = new Date(createdAt);
	const [docIdx, setDocIdx] = useState(0);

	const handleChangeDocIdx = (idx) => {
		setDocIdx(idx);
	};

	return (
		<Modal>
			<div css={docsItemWrapperStyle}>
				<div css={docsItemHeaderStyle}>
					<div>#{idx}</div>
					<div>Sync</div>
					<div css={docsItemBtnsStyle}>
						<Button size="small">다운로드</Button>
						<Button size="small">닫기</Button>
					</div>
				</div>
				<div css={docsItemBodyStyle}>
					<div css={docsItemVideoAreaStyle}>
						<Video width={100} src="" />
						<div css={docsItemVideoInfoStyle}>
							<div>
								<div>일시</div>
								<div>{createdAtDate.toLocaleDateString()}</div>
							</div>
							<div>
								<div>면접 시간</div>
								<div>{videoPlayTime}</div>
							</div>
							<div>
								<div>면접자</div>
								<div>dummyUUID</div>
							</div>
						</div>
					</div>
					<div css={docsItemFbAreaStyle}>
						<div css={docsItemFbBtnsStyle}>
							{feedbacks.map((fb, i) => (
								<Button size="small" key={i} onClick={() => handleChangeDocIdx(i)}>
									{fb.nickname}
								</Button>
							))}
						</div>
						<div css={docsItemFbListStyle}>
							{feedbacks[docIdx] ? (
								<FeedbackList
									feedbackList={getFirstLabeledFbList(
										feedbacks[docIdx].feedbackList
									)}
								/>
							) : (
								<div>작성된 피드백이 없습니다.</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default InterviewDocsItemModal;
