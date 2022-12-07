import { pageState } from '@store/page.store';
import { getPathWithPage } from '@utils/getPathWithPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const useSafeNavigator = () => {
	const page = useRecoilValue(pageState);
	const navigate = useNavigate();
	useEffect(() => {
		navigate(getPathWithPage(page));
	}, [page]);
};
export default useSafeNavigator;
