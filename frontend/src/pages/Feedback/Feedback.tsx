import React from 'react';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import Timeline from '@components/Timeline/Timeline';

const Feedback = () => {
	return (
		<>
			<IntervieweeVideo width={600} controls src="assets/test.mp4" />
			<Timeline />
		</>
	);
};

export default Feedback;
