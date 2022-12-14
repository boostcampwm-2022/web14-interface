import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { completedFbCntState } from '@store/interview.store';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';

import { socket } from '../../service/socket';
import BottomBar from '@components/BottomBar/BottomBar';
import { waitingWrapperStyle } from './Waiting.style';
import useCleanupInterview from '@hooks/useCleanupInterview';
import { othersInRoomState } from '@store/user.store';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import ussCommonSocketEvent from '@hooks/useCommonSocketEvent';

import Tetris from 'react-tetris';
import './Tetris.style.css';
import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';
import Button from '@components/@shared/Button/Button';

const Waiting = () => {
	usePreventLeave();
	ussCommonSocketEvent();

	const cleanupInterview = useCleanupInterview();
	const { safeNavigate } = useSafeNavigate();
	const totalUser = useRecoilValue(othersInRoomState);
	const [completedFbCnt, setCompletedFbCnt] = useRecoilState(completedFbCntState);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.COUNT_FEEDBACK, (res) => {
			const { count } = res;
			setCompletedFbCnt(count);
		});

		socket.on(SOCKET_EVENT_TYPE.TERMINATE_SESSION, () => {
			setCompletedFbCnt(totalUser.length);
			safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.COUNT_FEEDBACK);
			socket.off(SOCKET_EVENT_TYPE.TERMINATE_SESSION);
		};
	}, []);

	useEffect(() => {
		return cleanupInterview;
	}, []);

	return (
		<>
			<div css={waitingWrapperStyle}>
				<div css={notiSideStyle}>
					<div>면접관이 피드백을 정리 중입니다.</div>
					<div>
						{totalUser.length}명 중 {completedFbCnt}명 완료
					</div>
				</div>
				<Tetris
					keyboardControls={{
						down: 'MOVE_DOWN',
						left: 'MOVE_LEFT',
						right: 'MOVE_RIGHT',
						space: 'HARD_DROP',
						z: 'FLIP_COUNTERCLOCKWISE',
						x: 'FLIP_CLOCKWISE',
						up: 'FLIP_CLOCKWISE',
						p: 'TOGGLE_PAUSE',
						c: 'HOLD',
						shift: 'HOLD',
					}}
				>
					{({
						HeldPiece,
						Gameboard,
						PieceQueue,
						points,
						linesCleared,
						state,
						controller,
					}) => (
						<div css={tetrisWrapperStyle}>
							<div css={tetrisLeftStyle}>
								<HeldPiece />
								<div>
									<p>Points: {points}</p>
									<p>Lines Cleared: {linesCleared}</p>
								</div>
								{state === 'LOST' && (
									<div css={loseStyle}>
										<p>Game Over</p>
										<Button size="small" onClick={controller.restart}>
											New game
										</Button>
									</div>
								)}
							</div>
							<Gameboard />
							<PieceQueue />
						</div>
					)}
				</Tetris>
			</div>
			<BottomBar />
		</>
	);
};

export default Waiting;

const notiSideStyle = () => css`
	${flexColumn({ gap: '32px' })}
`;

const tetrisWrapperStyle = () => css`
	${flexRow({ gap: '32px' })};
`;

const tetrisLeftStyle = () => css`
	${flexColumn({})};

	p {
		font-size: 20px;
	}
`;

const loseStyle = () => css`
	p {
		font-size: 16px;
	}
`;
