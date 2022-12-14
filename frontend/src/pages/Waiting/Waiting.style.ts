import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const waitingWrapperStyle = (theme) => css`
	${flexRow({ gap: '64px' })};

	width: 100%;
	height: 100%;

	text-align: center;
	background-color: ${theme.colors.tertiary};

	div {
		font-size: 20px;
		color: ${theme.colors.white};
	}

	div:nth-child(2) {
		font-size: 32px;
		color: ${theme.colors.white};
	}

	.game-block {
		margin: 0;
		padding: 0;
		width: 20px;
		height: 20px;
		border: 1px solid #ddd;
	}
	.piece-i {
		background-color: #ec858b;
	}
	.piece-j {
		background-color: #f1b598;
	}
	.piece-l {
		background-color: #f8efae;
	}
	.piece-o {
		background-color: #b5a677;
	}
	.piece-s {
		background-color: #816e56;
	}
	.piece-t {
		background-color: #b77c72;
	}
	.piece-z {
		background-color: #e3be58;
	}
	.piece-preview {
		background-color: #eee;
	}
`;

export const notiSideStyle = () => css`
	${flexColumn({ gap: '32px' })}
`;

export const tetrisWrapperStyle = () => css`
	${flexRow({ gap: '32px' })};
`;

export const tetrisLeftStyle = () => css`
	${flexColumn({})};

	p {
		font-size: 20px;
	}
`;

export const loseStyle = () => css`
	p {
		font-size: 16px;
	}
`;
