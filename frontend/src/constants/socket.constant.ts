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
	FINISH_STREAMING = 'finish_streaming',
	UPDATE_MEDIA_INFO = 'update_media_info',
}

export enum WEBRTC_EVENT_TYPE {
	START_SIGNALING = 'start_signaling',
	RECEIVE_SIGNALING = 'receive_signaling',
	OFFER = 'offer',
	ANSWER = 'answer',
	ICECANDIDATE = 'icecandidate',
	DISCONNECT_WEBRTC = 'disconnect_webrtc',
}

export enum SOCKET_RES_MESSAGE {
	FULL_ROOM = 'full_room',
	NO_ROOM = 'no_room',
	BUSY_ROOM = 'busy_room',
	NOT_ENOUGHT_USER = 'not_enought_user',
	EXIST_SAME_AUTH_ID = 'exist_same_auth_id',
}

export enum SOCKET_TOAST_MESSAGE {
	FULL_ROOM = '방이 가득 찼습니다',
	NO_ROOM = '방이 없습니다',
	BUSY_ROOM = '인터뷰 중인 방입니다',
	NOT_ENOUGHT_USER = '인원이 부족합니다',
	EXIST_SAME_AUTH_ID = '중복된 계정로 참가할 수 없습니다',
}
