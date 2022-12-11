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

export enum SOCKET_MESSAGE {
	FULL_ROOM = 'full_room',
	NO_ROOM = 'no_room',
	BUSY_ROOM = 'busy_room',
	NOT_ENOUGHT_USER = 'not_enought_user',
	VIDEO_TIME_LIMIT_OVER = 'video_time_limit_over',
	EXIST_SAME_AUTH_ID = 'exist_same_auth_id',
}

export enum EXCEPTION_MESSAGE {
	INVALID_USER_ROLE = '해당하는 유저의 역할이 없습니다.',
	INVALID_CHANGE_PHASE = 'interview 진행 단계가 옳바르지 않습니다.',
}
