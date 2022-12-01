import axios from 'axios';
import { selector } from 'recoil';

const isAuthQuery = selector({
	key: 'isAUth',
	get: async () => {
		try {
			const res = await axios.get('/api/auth/login');
			console.log(res);
			return res.status === 200;
		} catch (e) {
			console.log(e);
			if (e.response.status === 401) return false;
			throw e;
		}
	},
});
export default isAuthQuery;
