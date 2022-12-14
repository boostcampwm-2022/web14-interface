import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { currentModalState } from '@store/currentModal.store';
import { useRef, useEffect } from 'react';
import { MODAL_TYPE } from '@components/ModalManager';

const useModal = () => {
	const modalParentRef = useRef<HTMLDivElement>(document.querySelector('#popup-root'));
	const setCurrentModal = useSetRecoilState(currentModalState);
	const resetCurrentModal = useResetRecoilState(currentModalState);

	const openModal = (modal: MODAL_TYPE, props?) => {
		modalParentRef.current.style.display = 'flex';
		setCurrentModal({ modal, props });
	};

	const closeModal = () => {
		modalParentRef.current.style.display = 'none';
		resetCurrentModal();
	};

	const parentCloseModal = (e) => {
		if (e.target === modalParentRef.current) closeModal();
	};

	useEffect(() => {
		modalParentRef?.current?.addEventListener('click', parentCloseModal);

		return () => {
			modalParentRef?.current?.removeEventListener('click', parentCloseModal);
		};
	});

	return { openModal, closeModal };
};

export default useModal;
