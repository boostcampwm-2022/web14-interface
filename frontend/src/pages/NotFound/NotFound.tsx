import React from 'react';
import { ReactComponent as PreviewError } from '@assets/preview_error.svg';
import { css } from '@emotion/react';
import Button from '@components/@shared/Button/Button';
import { flexColumn, flexRow } from '@styles/globalStyle';
import { useNavigate } from 'react-router-dom';
import { PAGE_TYPE } from '@constants/page.constant';
import { Link } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	const goToMain = () => {
		navigate(PAGE_TYPE.LANDING_PAGE);
	};

	return (
		<div css={NotFoundWrapperStyle}>
			<PreviewError css={PreviewErrorStyle} />
			<div css={ContentWrapperStyle}>
				<h1>404</h1>
				<span>페이지를 찾을 수 없습니다.</span>
				<div css={buttonAreaStyle}>
					<Button color="red" width="100%" onClick={goToMain}>
						메인으로
					</Button>
					<a href="https://github.com/boostcampwm-2022/web14-interface">
						<Button color="secondary" width="100%">
							문의하기
						</Button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default NotFound;