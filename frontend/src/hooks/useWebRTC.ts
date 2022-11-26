import React, { useRef, useEffect } from 'react';
import { socket } from '../service/socket';

const useWebRTC = (
	senderId: string,
	setMyStream: React.Dispatch<React.SetStateAction<MediaStream>>,
	setStreamList: React.Dispatch<React.SetStateAction<MediaStream[]>>
) => {
	const myStreamRef = useRef(null);
	const connectionListRef = useRef(new Map());

	async function getMedia() {
		try {
			const newStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});

			setMyStream(newStream);
			myStreamRef.current = newStream;
		} catch (e) {
			alert(e);
			console.log(e);
		}
	}

	const handleIce = (senderId, recieverID, data) => {
		socket.emit('ice', data.candidate, senderId, recieverID);
	};

	const handleAddStream = async (receiverId, data) => {
		connectionListRef.current.set(receiverId, {
			...connectionListRef.current.get(receiverId),
			stream: data.stream,
		});
		setStreamList((current) => [...current, data.stream]);
	};

	const makeConnection = (senderID, recieverID) => {
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

		connection.addEventListener('icecandidate', (data) =>
			handleIce(senderID, recieverID, data)
		);
		connection.addEventListener('addstream', (data) => handleAddStream(recieverID, data));

		myStreamRef.current
			.getTracks()
			.forEach((track) => connection.addTrack(track, myStreamRef.current));

		connectionListRef.current.set(recieverID, { connection });
	};

	const enterRoomInit = async () => {
		await getMedia();

		socket.emit('join_room', senderId);

		socket.on('welcome', async (receiverId) => {
			//알림을 받는 쪽에서 실행
			console.log('상대방 닉네임', receiverId);
			makeConnection(senderId, receiverId);
			const offer = await connectionListRef.current.get(receiverId).connection.createOffer(); //초대장 만들기
			connectionListRef.current.get(receiverId).connection.setLocalDescription(offer);
			socket.emit('offer', offer, senderId, receiverId);
		});

		//새로운 참가자가 offer를 받으면 answer를 만들어서 기존 참가자들에게 보냄
		socket.on('offer', async (offer, receiverId) => {
			makeConnection(senderId, receiverId);
			connectionListRef.current.get(receiverId).connection.setRemoteDescription(offer);
			const answer = await connectionListRef.current
				.get(receiverId)
				.connection.createAnswer();
			connectionListRef.current.get(receiverId).connection.setLocalDescription(answer);
			socket.emit('answer', answer, senderId, receiverId);
		});

		//answer를 받으면 내꺼에 answer를 등록
		socket.on('answer', (answer, receiverId) => {
			connectionListRef.current.get(receiverId).connection.setRemoteDescription(answer);
		});

		//candicate를 받음.
		socket.on('ice', (ice, receiverId) => {
			connectionListRef.current.get(receiverId).connection.addIceCandidate(ice);
		});
	};

	useEffect(() => {
		enterRoomInit();
	}, []);

	return { myStreamRef, connectionListRef };
};

export default useWebRTC;
