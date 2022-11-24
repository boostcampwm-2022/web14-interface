import React, { useEffect } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { io } from 'socket.io-client';

const socket = io(`ws://localhost:3000/`, {
	transports: ['websocket'],
});

let stream;
//p2p connection 인당 설정되어야함.
let connection;

const handleIce = (data) => {
	console.log('candidate 보냄', data.candidate);
	socket.emit('ice', data.candidate);
};

const handleAddStream = (data) => {
	console.log('stream 받음');
	console.log("Peer's Stream", data.stream);
	console.log('my Stream');
	const newVideo = document.createElement('video');

	newVideo.srcObject = data.stream;
	newVideo.width = 400;
	newVideo.autoplay = true;
	newVideo.playsInline = true;
	document.body.appendChild(newVideo);
};

async function getMedia() {
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});

		const newVideo = document.createElement('video');

		newVideo.srcObject = stream;
		newVideo.width = 400;
		newVideo.autoplay = true;
		newVideo.playsInline = true;
		document.body.appendChild(newVideo);
	} catch (e) {
		console.log(e);
	}
}

const initConnection = async () => {
	await getMedia();

	connection = new RTCPeerConnection({
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

	connection.addEventListener('icecandidate', handleIce);
	connection.addEventListener('addstream', handleAddStream);

	//내 stream을 가져와 conection에 track을 추가한다.
	stream.getTracks().forEach((track) => connection.addTrack(track, stream));

	socket.emit('join_room');
};

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	useEffect(() => {
		initConnection();

		socket.on('welcome', async () => {
			//알림을 받는 쪽에서 실행
			const offer = await connection.createOffer(); //초대장 만들기
			connection.setLocalDescription(offer);
			console.log('offer를 보냄');
			socket.emit('offer', offer);
		});

		//새로운 참가자가 offer를 받으면 answer를 만들어서 기존 참가자들에게 보냄
		socket.on('offer', async (offer) => {
			console.log('offer 받음');
			connection.setRemoteDescription(offer);
			const answer = await connection.createAnswer();
			connection.setLocalDescription(answer);
			socket.emit('answer', answer);
			console.log('answer 전송');
		});

		//answer를 받으면 내꺼에 answer를 등록
		socket.on('answer', (answer) => {
			console.log('answer 받음');
			connection.setRemoteDescription(answer);
		});

		//candicate를 받음.
		socket.on('ice', (ice) => {
			console.log('candidate 받음', ice);
			connection.addIceCandidate(ice);
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
