import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { docsItemQuery } from '@store/interviewDocs.store';
import Button from '@components/@shared/Button/Button';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import { getFirstLabeledFbList, secMMSSFormatter } from '@utils/common.util';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import { ReactComponent as BackIcon } from '@assets/icon/back.svg';
import { ReactComponent as NextIcon } from '@assets/icon/next.svg';
import { feedbackIdsState } from '@store/feedback.store';
import {
	docsItemFbAreaStyle,
	docsItemFbListStyle,
	docsItemVideoAreaStyle,
	docsItemWrapperStyle,
	docsUserTabContainerStyle,
	docsUserTabStyle,
	noFeedbackUserStyle,
} from './InterviewDocsDetail.style';

interface Props {
	docsUUID: string;
}

const InterviewDocsDetail = ({ docsUUID }: Props) => {
	const tabScrollRef = useRef([]);
	const docsItem = useRecoilValue(docsItemQuery(docsUUID));
	const { createdAt, videoPlayTime, feedbacks, videoUrl } = docsItem;
	const setFbIds = useSetRecoilState(feedbackIdsState);

	const [docIdx, setDocIdx] = useState(0);

	const handleChangeDocIdx = (idx) => {
		setDocIdx(idx);
	};

	const handleDecreaseDocIdx = () => {
		setDocIdx((current) => --current);
	};

	const handleIncreaseDocIdx = () => {
		setDocIdx((current) => ++current);
	};

	useEffect(() => {
		if (feedbacks.length <= 0 || !feedbacks[docIdx]) return;

		const idList = feedbacks[docIdx].feedbackList.map(({ startTime, innerIndex }) => {
			return startTime.toString().padStart(6, '0') + innerIndex.toString().padStart(2, '0');
		});

		feedbacks[docIdx].feedbackList.length > 0 && setFbIds(idList);

		tabScrollRef.current[docIdx].scrollIntoView({ inline: 'start' });
	}, [docIdx]);

	return (
		<div css={docsItemWrapperStyle}>
			<div css={docsItemVideoAreaStyle}>
				<IntervieweeVideo width={'100%'} src={videoUrl} controls />
				<table>
					<tr>
						<td>일시</td>
						<td>{createdAt}</td>
					</tr>
					<tr>
						<td>면접 시간</td>
						<td>{secMMSSFormatter(videoPlayTime)}</td>
					</tr>
				</table>
			</div>
			{feedbacks.length > 0 && feedbacks[docIdx] ? (
				<div css={docsItemFbAreaStyle}>
					<div css={docsUserTabContainerStyle}>
						<Button
							color="secondary"
							size="small"
							style="text"
							disabled={docIdx <= 0 ? true : false}
							onClick={handleDecreaseDocIdx}
						>
							<BackIcon />
						</Button>
						<div css={docsUserTabStyle}>
							{feedbacks.map((fb, i) => (
								<Button
									ref={(el) => (tabScrollRef.current[i] = el)}
									size="small"
									key={fb.nickname}
									onClick={() => handleChangeDocIdx(i)}
									color={docIdx === i ? 'primary' : 'secondary'}
								>
									{fb.nickname}
								</Button>
							))}
						</div>
						<Button
							color="secondary"
							size="small"
							style="text"
							disabled={docIdx >= feedbacks.length - 1 ? true : false}
							onClick={handleIncreaseDocIdx}
						>
							<NextIcon />
						</Button>
					</div>
					<div css={docsItemFbListStyle}>
						<FeedbackList
							feedbackList={getFirstLabeledFbList(feedbacks[docIdx].feedbackList)}
						/>
					</div>
				</div>
			) : (
				<div css={noFeedbackUserStyle}>피드백을 작성한 유저가 없습니다.</div>
			)}
		</div>
	);
};

export default InterviewDocsDetail;
