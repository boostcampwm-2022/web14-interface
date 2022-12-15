import React, { useState, Suspense } from 'react';
import Button from '@components/@shared/Button/Button';
import useModal from '@hooks/useModal';
import InterviewDocsList from '@components/InterviewDocsList/InterviewDocsList';
import InterviewDocsDetail from '@components/InterviewDocsDetail/InterviewDocsDetail';
import { ReactComponent as BackIcon } from '@assets/icon/back.svg';
import { ReactComponent as DownloadIcon } from '@assets/icon/download.svg';
import { ReactComponent as LinkIcon } from '@assets/icon/link.svg';
import { ReactComponent as SyncDotLine } from '@assets/sync_dot_line.svg';
import { isFbSyncState } from '@store/feedback.store';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import { useRecoilState } from 'recoil';
import {
	docsModalContentStyle,
	docsModalHeaderStyle,
	docsModalWrapperStyle,
	modalSyncButtonAreaStyle,
	modalSyncDotLineStyle,
} from './InterviewDocsModal.style';
import { flexRow } from '@styles/globalStyle';
import Loading from '@components/Loading/Loading';

export interface DocsInfoType {
	docsUUID: string;
	idx: number;
}

interface InterviewDocsModalPropType {
	roomUUID: string;
}

const InterviewDocsModal = ({ roomUUID = '' }: InterviewDocsModalPropType) => {
	const { closeModal } = useModal();
	const [section, setSection] = useState('list');
	const [docsInfo, setDocsInfo] = useState<DocsInfoType | null>(null);
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);

	const handleSection = () => {
		setSection(section === 'list' ? 'detail' : 'list');
		if (section === 'detail') setDocsInfo(null);
	};

	const handleClickDocsItem = (docsInfo: DocsInfoType) => {
		setDocsInfo(docsInfo);
		handleSection();
	};

	return (
		<div css={(theme) => docsModalWrapperStyle(theme, section)}>
			<div css={docsModalHeaderStyle}>
				<div css={flexRow({ gap: '8px' })}>
					{section === 'list' ? (
						<span>인터뷰 기록</span>
					) : (
						<>
							<Button
								size="small"
								color="secondary"
								style="text"
								onClick={handleSection}
							>
								<BackIcon />
							</Button>
							<span>#{docsInfo?.idx}</span>
						</>
					)}
				</div>
				{section !== 'list' && (
					<div css={modalSyncButtonAreaStyle}>
						<SyncDotLine css={modalSyncDotLineStyle} />
						<RoundButton
							style={{
								width: 40,
								size: 'small',
								color: isFbSync ? 'primary' : 'secondary',
							}}
							onClick={() => setIsFbSync((current) => !current)}
						>
							<LinkIcon />
						</RoundButton>
						<SyncDotLine css={modalSyncDotLineStyle} />
					</div>
				)}
				<div css={flexRow({ gap: '8px' })}>
					{section !== 'list' && (
						<Button size="small" color="secondary">
							<DownloadIcon /> 다운로드
						</Button>
					)}
					<Button size="small" color="red" onClick={closeModal}>
						닫기
					</Button>
				</div>
			</div>
			<Suspense fallback={<Loading />}>
				<div css={docsModalContentStyle(section)}>
					<InterviewDocsList
						roomUUID={roomUUID}
						handleClickDocsItem={handleClickDocsItem}
					/>
					{docsInfo && <InterviewDocsDetail docsUUID={docsInfo?.docsUUID} />}
				</div>
			</Suspense>
		</div>
	);
};

export default InterviewDocsModal;
