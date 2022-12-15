import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const ModalWrapperStyle = (theme) => css`
	${flexColumn({ gap: '32px' })};

	width: 480px;
	background-color: ${theme.colors.white};
	padding: 40px 32px 32px 32px;

	border: 1px solid ${theme.colors.gray2};
	border-radius: ${theme.borderRadius};
`;

export const ModalTitleStyle = (theme, color) => css`
	color: ${theme.colors[color]};

	font-size: ${theme.fontSize.large};
	font-weight: bold;
`;

export const ModalButtonAreaStyle = (isArray) => css`
	${flexRow({ justifyContent: isArray ? 'space-between' : 'center' })};

	width: 100%;
`;

export const ModalContentAreaStyle = (gap = '16px', flexDirection) => css`
	${flexDirection === 'row'
		? flexRow({ gap, justifyContent: 'center' })
		: flexColumn({ gap, justifyContent: 'center' })}

	width: 100%;
`;
