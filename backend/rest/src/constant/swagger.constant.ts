import { HttpStatus } from '@nestjs/common';
import { RedirectUrlResponseDto } from 'src/auth/dto/redirect-url.dto';
import { UserIdResponseDto } from 'src/auth/dto/user-id.dto';
import { DocsListResponseDto } from 'src/interview/dto/docs-list.dto';
import { DocsResponseDto } from 'src/interview/dto/docs.dto';
import { DocsRequestDto } from 'src/interview/dto/request-docs.dto';
import { FeedbackRequestDto } from 'src/interview/dto/feedback.dto';

export const REDIRECT_URL_SWAGGER = {
	SUMMARY: { summary: 'type별 oauth URL 가져오기' },
	SUCCESS: {
		status: HttpStatus.OK,
		description: 'url 요청 성공',
		type: RedirectUrlResponseDto,
	},
};

export const LOGIN_SWAGGER = {
	SUMMARY: { summary: '로그인 및 로그인 여부 확인하기' },
	SUCCESS: {
		status: HttpStatus.OK,
		description: '로그인 성공',
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '로그인 실패',
	},
};

export const USERID_SWAGGER = {
	SUMMARY: { summary: '유저 id 가져오기' },
	SUCCESS: {
		status: HttpStatus.OK,
		description: 'id 요청 성공',
		type: UserIdResponseDto,
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	},
};

export const LOGOUT_SWAGGER = {
	SUMMARY: { summary: 'logout 하기' },
	SUCCESS: {
		status: HttpStatus.OK,
		description: '로그아웃 성공',
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '로그아웃 실패',
	},
};

export const CREATE_INTERVIEW_DOCS_SWAGGER = {
	SUMMARY: { summary: 'interview docs 생성하기' },
	SUCCESS: {
		status: HttpStatus.CREATED,
		description: '생성 성공',
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '생성 실패',
	},
	BODY: {
		type: DocsRequestDto,
	},
};

export const CREATE_FEEDBACK_DOCS_SWAGGER = {
	SUMMARY: { summary: 'feedback 생성하기' },
	SUCCESS: {
		status: HttpStatus.CREATED,
		description: '생성 성공',
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '생성 실패',
	},
	BODY: {
		type: FeedbackRequestDto,
	},
};

export const GET_INTERVIEW_DOCS_SWAGGER = {
	SUMMARY: { summary: 'docs UUID로 interview docs 가져오기' },
	SUCCESS: {
		status: HttpStatus.OK,
		description: '성공',
		type: DocsResponseDto,
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	},
};

export const GET_INTERVIEW_DOCS_LIST_SWAGGER = {
	SUMMARY: { summary: 'interview docs list 가져오기' },
	SUCCESS: {
		status: HttpStatus.OK,
		description: '성공',
		type: DocsListResponseDto,
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	},
};

export const DELETE_INTERVIEW_DOCS_SWAGGER = {
	SUMMARY: { summary: 'interview docs 삭제하기' },
	SUCCESS: {
		status: HttpStatus.NO_CONTENT,
		description: '삭제 성공',
	},
	FAIL: {
		status: HttpStatus.UNAUTHORIZED,
		description: '인증 실패',
	},
};
