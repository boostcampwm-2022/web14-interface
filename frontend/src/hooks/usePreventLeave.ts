import { useEffect } from 'react';

const usePreventLeave = () => {
	const preventClose = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		e.returnValue = '';
	};

	// useEffect(() => {
	// 	(() => {
	// 		window.addEventListener('beforeunload', preventClose);
	// 	})();

	// 	return () => {
	// 		window.removeEventListener('beforeunload', preventClose);
	// 	};
	// }, []);

	const preventGoBack = () => {
		history.pushState(null, '', location.href);
	};

	useEffect(() => {
		history.pushState(null, '', location.href);
		window.addEventListener('popstate', preventGoBack);

		return () => {
			window.removeEventListener('popstate', preventGoBack);
		};
	}, []);
};

export default usePreventLeave;
