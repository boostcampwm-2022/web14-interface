import React from 'react';
import ReactLoading from 'react-loading';
import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';
import theme from '@styles/theme';

const Loading = () => {
	return (
		<div css={loadingWrapperStyle}>
			<ReactLoading type="spokes" color={theme.colors.primary} />
		</div>
	);
};

export default Loading;

const loadingWrapperStyle = () => css`
	${flexColumn({})};

	width: 100%;
	height: 100%;
`;
