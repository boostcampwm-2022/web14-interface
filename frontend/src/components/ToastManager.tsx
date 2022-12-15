import React from 'react';
import { toastState } from '@store/toast.store';
import { useRecoilValue } from 'recoil';

const ToastContainer = () => {
	const toast = useRecoilValue(toastState);

	return toast;
};

export default ToastContainer;
