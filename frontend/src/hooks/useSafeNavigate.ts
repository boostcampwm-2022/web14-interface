import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { pageState } from '@store/page.store';
import { PAGE_TYPE } from '@constants/page.constant';
import isAuthQuery from '@store/auth.store';
import useModal from './useModal';

const useSafeNavigate = () => {
	const { closeModal } = useModal();
	const setPage = useSetRecoilState(pageState);
	const authRefresher = useRecoilRefresher_UNSTABLE(isAuthQuery);
	const safeNavigate = (newPage: PAGE_TYPE) => {
		authRefresher();
		closeModal();
		setPage(newPage);
	};

	return { safeNavigate };
};
export default useSafeNavigate;
