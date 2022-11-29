import React, { useRef, useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';

import { socket } from '../service/socket';

export interface WebRTCUserType {
	connection: RTCPeerConnection;
	stream: MediaStream;
}

const useWebRTCSignaling = (
	webRTCUserList: Map<string, WebRTCUserType>,
	setWebRTCUserList: SetterOrUpdater<Map<string, WebRTCUserType>>
) => {
	const myStreamRef = useRef(null);
	const connectionListRef = useRef(new Map());

	/**
	 내 미디어 장치로부터 MediaStream을 가져와 myStreamRef를 Stream으로 설정합니다. 
	 그 후 setMyStream을 통해 외부 myStream 상태를 Stream으로 설정합니다.
	 */
	async function getMyStream(myId) {
		try {
			const newStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});

			myStreamRef.current = newStream;
			setWebRTCUserList((prev) =>
				new Map(prev).set(myId, { connection: null, stream: newStream })
			);
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * RTCPeerConnection에 icecandidate 이벤트 발생 시 핸들링하는 함수입니다.
	 * 들어온 icecandidate를 시그널링 서버를 통해 상대방에게 전달합니다.
	 * @param event icecandidate event
	 * @param myId 내 ID
	 * @param opponentId connection으로 연결된 상대방의 ID
	 */
	const handleIce = (event, myId, opponentId) => {
		socket.emit('icecandidate', { icecandidate: event.candidate, myId, opponentId });
	};

	/**
	 * RTCPeerConnectiono에 addstream 이벤트 발생 시 핸들링하는 함수입니다.
	 * 들어온 stream을 connectionListRef에 보낸 사람의 ID와 매칭하여 저장합니다.
	 * 그 후 setWebRTCUserList를 통해 외부 webRTCUserList 상태를 새로 설정합니다.
	 * @param event addstream event
	 * @param opponentId connection으로 연결된 상대방의 ID
	 */
	const handleAddStream = (event, opponentId, connection) => {
		connectionListRef.current.set(opponentId, {
			...connectionListRef.current.get(opponentId),
			stream: event.stream,
		});
		setWebRTCUserList((prev) =>
			new Map(prev).set(opponentId, { connection, stream: event.stream })
		);
	};

	/**
	 * 새로운 RTCPeerConnection을 만듭니다.
	 * @param myId 내 ID
	 * @param opponentId Connection으로 연결되는 상대방의 ID
	 * @returns 새로 생성된 RTCPeerConnection
	 */
	const makeConnection = (myId, opponentId) => {
		const connection = new RTCPeerConnection({
			iceServers: [
				{
					urls: [
						'stun:stun.l.google.com:19302',
						'stun:stun1.l.google.com:19302',
						'stun:stun2.l.google.com:19302',
						'stun:stun3.l.google.com:19302',
						'stun:stun4.l.google.com:19302',
					],
				},
			],
		});

		connection.addEventListener('icecandidate', (event) => handleIce(event, myId, opponentId));

		//TODO Deprecated Event : track으로 교체 필요
		//track으로 교체 시 event.streams[0].id에 대해 중복 제거 로직 추가 필요
		connection.addEventListener('addstream', (event) =>
			handleAddStream(event, opponentId, connection)
		);

		myStreamRef.current
			.getTracks()
			.forEach((track) => connection.addTrack(track, myStreamRef.current));

		connectionListRef.current.set(opponentId, { connection });

		return connection;
	};

	/**
	 * WebRTC Connection 시작 함수입니다.
	 * 실행 시, 유저로부터 Stream을 얻어오고 socket에 필요한 이벤트를 설정 후,
	 * 서버에 start_signaling 이벤트를 보냅니다.
	 */
	const startConnection = async (myId) => {
		await getMyStream(myId);

		socket.on('receive_signaling', async (opponentId) => {
			const newConnection = makeConnection(myId, opponentId);
			const offer = await newConnection.createOffer();
			newConnection.setLocalDescription(offer);

			socket.emit('offer', { offer, myId, opponentId });
		});

		socket.on('offer', async ({ offer, opponentId }) => {
			const newConnection = makeConnection(myId, opponentId);
			newConnection.setRemoteDescription(offer);
			const answer = await newConnection.createAnswer();
			newConnection.setLocalDescription(answer);

			socket.emit('answer', { answer, myId, opponentId });
		});

		socket.on('answer', ({ answer, opponentId }) => {
			connectionListRef.current.get(opponentId).connection.setRemoteDescription(answer);
		});

		socket.on('icecandidate', ({ icecandidate, opponentId }) => {
			connectionListRef.current.get(opponentId).connection.addIceCandidate(icecandidate);
		});

		socket.on('disconnect_webrtc', closeConnection);

		socket.emit('start_signaling', myId);
	};

	/**
	 * 특정 Connection을 종료하기 위한 함수입니다.
	 * closeId에 매칭되는 MediaStreamTrack을 stop하고, connection을 close합니다.
	 * 그 후, connectionListRef과 외부 webRTCUserList를 업데이트합니다.
	 * @param closeId 서버가 보낸 나간 UserId
	 */
	const closeConnection = (closeId) => {
		const oldStream = webRTCUserList.get(closeId).stream;
		const oldConnection = webRTCUserList.get(closeId).connection;

		oldStream.getTracks().forEach((track) => track.stop());
		oldConnection.close();

		connectionListRef.current?.delete(closeId);
		const newUserList = new Map(webRTCUserList);
		newUserList.delete(closeId);
		setWebRTCUserList(newUserList);
	};

	useEffect(() => {
		return () => {
			socket.off('receive_signaling');
			socket.off('offer');
			socket.off('answer');
			socket.off('icecandidate');
			socket.off('disconnect_webrtc');
		};
	}, []);

	return { startConnection, closeConnection };
};

export default useWebRTCSignaling;
