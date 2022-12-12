import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';

export const feedbackListStyle = css`
	${flexColumn({ gap: '8px', justifyContent: 'unset' })};

	width: 100%;
	height: 100%;
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	&&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;
