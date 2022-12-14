import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { pageState } from '@store/page.store';
import { PAGE_TYPE } from '@constants/page.constant';
import isAuthQuery from '@store/auth.store';

const useSafeNavigate = () => {
	const setPage = useSetRecoilState(pageState);
	const authRefresher = useRecoilRefresher_UNSTABLE(isAuthQuery);
	const safeNavigate = (newPage: PAGE_TYPE) => {
		authRefresher();
		setPage(newPage);
	};

	return { safeNavigate };
};
export default useSafeNavigate;
