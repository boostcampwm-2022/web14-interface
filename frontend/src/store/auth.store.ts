import { SC_TYPE } from '@constants/statusCode.constants';
import axios from 'axios';
import { selector } from 'recoil';

const isAuthQuery = selector({
	key: 'isAUth',
	get: async () => {
		try {
			const res = await axios.get('/api/auth/login');
			return res.status === SC_TYPE.OK;
		} catch (e) {
			if (e.response.status === SC_TYPE.UNAUTHORIZED) return false;
			throw e;
		}
	},
});
export default isAuthQuery;
