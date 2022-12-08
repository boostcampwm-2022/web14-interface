import { useSetRecoilState } from 'recoil';
import { currentModalState } from '@store/currentModal.atom';
import { useRef, useEffect } from 'react';

const useModal = () => {
	const modalParentRef = useRef<HTMLDivElement>(document.querySelector('#popup-root'));
	const setCurremtModal = useSetRecoilState(currentModalState);

	const openModal = (modal: string, props?) => {
		modalParentRef.current.style.display = 'flex';
		setCurremtModal({ modal, props });
	};

	const closeModal = () => {
		modalParentRef.current.style.display = 'none';
		setCurremtModal(null);
	};

	const parentCloseModal = (e) => {
		if (e.target === modalParentRef.current) closeModal();
	};

	useEffect(() => {
		modalParentRef.current.addEventListener('click', parentCloseModal);

		return () => {
			modalParentRef.current.removeEventListener('click', parentCloseModal);
		};
	});

	return { openModal, closeModal };
};

export default useModal;
