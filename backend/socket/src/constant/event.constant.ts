export enum EVENT {
	// connection
	CREATE_ROOM = 'create_room',
	ENTER_ROOM = 'enter_room',
	LEAVE_ROOM = 'leave_room',

	// interview
	START_INTERVIEW = 'start_interview',
	JOIN_INTERVIEW = 'join_interview',
	END_INTERVIEW = 'end_interview',
	END_FEEDBACK = 'end_feedback',
	COUNT_FEEDBACK = 'count_feedback',
	TERMINATE_SESSION = 'terminate_session',
	CHANGE_USER = 'change_user',
	START_WAITING = 'start_waiting',
	START_FEEDBACK = 'start_feedback',

	// video
	VIDEO_BLOB = 'video_blob',
	LOAD_VIDEO = 'load_video',

	// chat
	SEND_MESSAGE = 'send_message',
	RECEIVE_MESSAGE = 'receive_message',

	// webRTC
	START_SIGNALING = 'start_signaling',
	RECEIVE_SIGNALING = 'receive_signaling',
	OFFER = 'offer',
	ANSWER = 'answer',
	ICECANDIDATE = 'icecandidate',
	DISCONNECT_WEBRTC = 'disconnect_webrtc',
}
