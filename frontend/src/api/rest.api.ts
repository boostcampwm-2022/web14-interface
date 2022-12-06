import axios from 'axios';

export const requestGet = async <T>(url) => {
	try {
		await axios.get(url);
	} catch (e) {
		console.log(e);
	}
};
