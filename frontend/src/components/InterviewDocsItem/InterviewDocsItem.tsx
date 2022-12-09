import React from 'react';

import { DocsItemDtoType } from '@customType/dto';
import { ReactComponent as DownloadIcon } from '@assets/icon/download.svg';
import { iconSmStyle } from '@styles/commonStyle';
import { createdAtStyle, docsItemWrapper, indexStyle, playTimeStyle } from './InterviewDocsItem.style';
import { mmssFormatter } from '@utils/common.util';
import { ONE_SECOND } from '@constants/time.constant';
import useModal from '@hooks/useModal';
import { MODAL_TYPE } from '@constants/modal.constant';

export interface Props {
	docs: DocsItemDtoType;
	idx: number;
	style: 'card' | 'list';
}

const InterviewDocsItem = ({ docs, idx, style }: Props) => {
	const { openModal } = useModal();
	const handleClickDocsItem = () => {
		openModal(MODAL_TYPE.InterviewDocsItemModal, { docsUUID: docs.id, idx });
	};
	return (
		<article onClick={handleClickDocsItem} css={(theme) => docsItemWrapper(theme, style)}>
			<div>
				<div css={indexStyle}>#{idx}</div>
				<div css={playTimeStyle}>{mmssFormatter(docs.videoPlayTime * ONE_SECOND)}</div>
			</div>
			<div>
				<div css={createdAtStyle}>{docs.createdAt.toLocaleString()}</div>
				<div>
					<DownloadIcon {...iconSmStyle} fill={style === 'list' ? 'black' : 'white'} />
				</div>
			</div>
		</article>
	);
};

export default InterviewDocsItem;
