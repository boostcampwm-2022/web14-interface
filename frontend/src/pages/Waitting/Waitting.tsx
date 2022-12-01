import usePreventLeave from '@hooks/usePreventLeave';
import React from 'react';

const Waitting = () => {
	usePreventLeave();
	return (
		<>
			<div></div>
		</>
	);
};

export default Waitting;
