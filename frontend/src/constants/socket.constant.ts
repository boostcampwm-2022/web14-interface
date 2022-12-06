export enum SOCKET_EVENT_TYPE {
	CRERATE_ROOM = 'create_room',
	ENTER_ROOM = 'enter_room',
	ENTER_USER = 'enter_user',
	LEAVE_USER = 'leave_user',
	LEAVE_ROOM = 'leave_room',
	START_INTERVIEW = 'start_interview',
	JOIN_INTERVIEW = 'join_interview',
	END_INTERVIEW = 'end_interview',
	START_WAITING = 'start_waiting',
	START_FEEDBACK = 'start_feedback',
	END_FEEDBACK = 'end_feedback',
	COUNT_FEEDBACK = 'count_feedback',
	TERMINATE_SESSION = 'terminate_session',
	STREAM_VIDEO = 'stream_video',
	DOWNLOAD_VIDEO = 'download_video',
	SEND_MESSAGE = 'send_message',
	RECEIVE_MESSAGE = 'receive_message',
}

export enum WEBRTC_EVENT_TYPE {
	START_SIGNALING = 'start_signaling',
	RECEIVE_SIGNALING = 'receive_signaling',
	OFFER = 'offer',
	ANSWER = 'answer',
	ICECANDIDATE = 'icecandidate',
	DISCONNECT_WEBRTC = 'disconnect_webrtc',
}
