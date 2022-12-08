export enum EVENT {
	// connection
	CREATE_ROOM = 'create_room',
	ENTER_ROOM = 'enter_room',
	LEAVE_ROOM = 'leave_room',
	ENTER_USER = 'enter_user',
	LEAVE_USER = 'leave_user',

	// interview
	START_INTERVIEW = 'start_interview',
	JOIN_INTERVIEW = 'join_interview',
	END_INTERVIEW = 'end_interview',
	END_FEEDBACK = 'end_feedback',
	COUNT_FEEDBACK = 'count_feedback',
	TERMINATE_SESSION = 'terminate_session',
	START_WAITING = 'start_waiting',
	START_FEEDBACK = 'start_feedback',

	// video
	VIDEO_BLOB = 'video_blob',

	// chat
	SEND_MESSAGE = 'send_message',
	RECEIVE_MESSAGE = 'receive_message',

	// objectStorage
	STREAM_VIDEO = 'stream_video',
	FINISH_STEAMING = 'finish_streaming',
	ALLOW_BUCKET_CORS = 'allow_bucket_cors',
	DOWNLOAD_VIDEO = 'download_video',

	// webRTC
	START_SIGNALING = 'start_signaling',
	RECEIVE_SIGNALING = 'receive_signaling',
	OFFER = 'offer',
	ANSWER = 'answer',
	ICECANDIDATE = 'icecandidate',
	DISCONNECT_WEBRTC = 'disconnect_webrtc',

	// error
	BAD_REQUEST = 'bad_request',
}

export enum ERROR_MSG {
	FULL_ROOM = '방이 꽉 찼습니다.',
	NO_ROOM = '없는 방입니다.',
	BUSY_ROOM = '현재 면접이 진행중입니다.',
	NOT_ENOUGHT_USER = '인원이 부족합니다.',
	INVALID_REQUEST = 'invalid_request',
	BAD_REQUEST = 'invalid socket request',
}
