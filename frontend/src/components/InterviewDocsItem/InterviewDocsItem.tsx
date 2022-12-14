import React from 'react';

import { DocsItemDtoType } from '@customType/dto';
import { ReactComponent as DownloadIcon } from '@assets/icon/download.svg';
import {
	createdAtStyle,
	docsItemWrapper,
	indexStyle,
	playTimeStyle,
} from './InterviewDocsItem.style';
import { mmssFormatter } from '@utils/common.util';
import { ONE_SECOND } from '@constants/time.constant';
import { DocsInfoType } from '@components/@modal/InterviewDocsModal/InterviewDocsModal';
import Button from '@components/@shared/Button/Button';

export interface InterviewDocsItemPropType {
	docs: DocsItemDtoType;
	idx: number;
	style: 'card' | 'list';
	handleClickDocsItem: (docsInfo: DocsInfoType) => void;
}

const InterviewDocsItem = ({
	docs,
	idx,
	style,
	handleClickDocsItem,
}: InterviewDocsItemPropType) => {
	return (
		<article
			css={(theme) => docsItemWrapper(theme, style)}
			onClick={() => handleClickDocsItem({ docsUUID: docs.id, idx })}
		>
			<div>
				<div css={indexStyle}>#{idx}</div>
				<div css={playTimeStyle}>{mmssFormatter(docs.videoPlayTime * ONE_SECOND)}</div>
			</div>
			<div>
				<div css={createdAtStyle}>{docs.createdAt}</div>
				<Button color="secondary" size="small">
					<DownloadIcon />
				</Button>
			</div>
		</article>
	);
};

export default InterviewDocsItem;
