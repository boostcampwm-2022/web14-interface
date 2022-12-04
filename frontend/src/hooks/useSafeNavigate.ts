import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { pageState } from '@store/page.atom';
import { PAGE_TYPE } from '@constants/page.constant';
import { getPathWithPage } from '@utils/getPathWithPage';

const useSafeNavigate = () => {
	const navigate = useNavigate();
	const setPage = useSetRecoilState(pageState);
	const safeNavigate = (newPage: PAGE_TYPE) => {
		setPage(newPage);
		setTimeout(() => navigate(getPathWithPage(newPage)));
	};
	return { safeNavigate };
};
export default useSafeNavigate;
