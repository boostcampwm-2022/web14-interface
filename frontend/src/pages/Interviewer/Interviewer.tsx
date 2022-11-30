import React from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { useRecoilValue } from 'recoil';
import { webRTCStreamSelector } from '@store/webRTC.atom';
import Video from '@components/@shared/Video/Video';

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const streamList = useRecoilValue(webRTCStreamSelector);

	return (
		<>
			<div>Interviewer</div>
			{streamList.map((stream) => (
				<Video key={stream.id} src={stream} width={200} autoplay muted />
			))}
			<button onClick={() => safeNavigate(PHASE_TYPE.FEEDBACK_PHASE)}>면접 종료</button>
		</>
	);
};

export default Interviewer;
