import { css } from '@emotion/react';

export const videoGridStyle = (rowNumber: number, colNumber: number) => css`
	display: grid;
	grid-template-rows: repeat(${rowNumber}, 1fr);
	grid-template-columns: repeat(${colNumber}, 1fr);
	gap: 2px;

	align-items: center;

	aspect-ratio: 16 / 9;
`;
