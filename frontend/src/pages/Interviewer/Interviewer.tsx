import React, { useEffect } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { socket } from '../../service/socket';

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const makeNewVideo = (stream) => {
		const newVideo = document.createElement('video');

		newVideo.srcObject = stream;
		newVideo.width = 400;
		newVideo.autoplay = true;
		newVideo.playsInline = true;
		document.body.appendChild(newVideo);
	};

	let stream;
	const connectionList = new Map();

	const handleIce = (senderId, recieverID, data) => {
		socket.emit('ice', data.candidate, senderId, recieverID);
	};

	const handleAddStream = async (receiverId, data) => {
		makeNewVideo(data.stream);
		connectionList.set(receiverId, { ...connectionList.get(receiverId), stream: data.stream });
	};

	async function getMedia() {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});

			makeNewVideo(stream);
		} catch (e) {
			console.log(e);
		}
	}

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

		//내 stream을 가져와 conection에 track을 추가한다.
		stream.getTracks().forEach((track) => connection.addTrack(track, stream));

		connectionList.set(recieverID, { connection });
	};

	const enterRoomInit = async (senderId) => {
		await getMedia();

		socket.emit('join_room', senderId);
	};

	useEffect(() => {
		const senderId = Math.random();
		console.log('내 닉네임', senderId);
		enterRoomInit(senderId);

		socket.on('welcome', async (receiverId) => {
			//알림을 받는 쪽에서 실행
			console.log('상대방 닉네임', receiverId);
			makeConnection(senderId, receiverId);
			const offer = await connectionList.get(receiverId).connection.createOffer(); //초대장 만들기
			connectionList.get(receiverId).connection.setLocalDescription(offer);
			socket.emit('offer', offer, senderId, receiverId);
		});

		//새로운 참가자가 offer를 받으면 answer를 만들어서 기존 참가자들에게 보냄
		socket.on('offer', async (offer, receiverId) => {
			makeConnection(senderId, receiverId);
			connectionList.get(receiverId).connection.setRemoteDescription(offer);
			const answer = await connectionList.get(receiverId).connection.createAnswer();
			connectionList.get(receiverId).connection.setLocalDescription(answer);
			socket.emit('answer', answer, senderId, receiverId);
		});

		//answer를 받으면 내꺼에 answer를 등록
		socket.on('answer', (answer, receiverId) => {
			connectionList.get(receiverId).connection.setRemoteDescription(answer);

			console.log(connectionList);
		});

		//candicate를 받음.
		socket.on('ice', (ice, receiverId) => {
			connectionList.get(receiverId).connection.addIceCandidate(ice);
		});
	}, []);

	return (
		<>
			<div>Interviewer</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.FEEDBACK_PHASE)}>면접 종료</button>
		</>
	);
};

export default Interviewer;
