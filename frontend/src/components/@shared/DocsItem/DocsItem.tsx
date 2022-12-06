import React from 'react';

import { DocsItemDtoType } from '@customType/dto';
import { ReactComponent as DownloadIcon } from '@assets/icon/download.svg';
import { iconSmStyle } from '@styles/commonStyle';
import { createdAtStyle, docsItemWrapper, indexStyle, playTimeStyle } from './DocsItem.style';
import { mmssFormatter } from '@utils/common.util';

export interface Props {
	docs: DocsItemDtoType;
	idx: number;
	style: 'card' | 'list';
}

const DocsItem = ({ docs, idx, style }: Props) => {
	const handleClickDocsItem = () => {
		//open modal
	};
	return (
		<article
			key={docs.docsUUID}
			onClick={handleClickDocsItem}
			css={(theme) => docsItemWrapper(theme, style)}
		>
			<div>
				<div css={indexStyle}>#{idx}</div>
				<div css={playTimeStyle}>{mmssFormatter(docs.playTime)}</div>
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

export default DocsItem;
