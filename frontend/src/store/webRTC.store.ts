import { atom, selector } from 'recoil';

export const webRTCUserMapState = atom({
	key: 'webRTCUserMapState',
	default: new Map(),
});

export const webRTCStreamSelector = selector({
	key: 'webRTCStreamSelector',
	get: ({ get }) => {
		return Array.from(get(webRTCUserMapState).entries()).map((userInfo) => {
			const [uuid, { stream }] = userInfo;
			return { uuid, stream };
		});
	},
});
