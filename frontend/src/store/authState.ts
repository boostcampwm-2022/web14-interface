import axios from 'axios';
import { selector } from 'recoil';

const isAuthQuery = selector({
	key: 'isAUth',
	get: async () => {
		const res = await axios.get('/api/auth/login');
		return res?.data.statusCode === 200 ? true : false;
	},
});
export default isAuthQuery;
