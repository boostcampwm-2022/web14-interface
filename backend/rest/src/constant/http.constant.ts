export enum HTTP_STATUS {
	HTTP_OK = 200,
	HTTP_REDIRECT = 301,
}

export enum HTTP_ERROR_MSG {
	UNKNOWN_OAUTH_TYPE_ERROR = '알 수 없는 Oatuh Type입니다.',
	UNAUTHORIZATION_ERROR = 'social 인증이 되지 않았습니다.',
	NULL_POINT_EXCEPTION = '삭제할 대상이 없습니다.',
}
