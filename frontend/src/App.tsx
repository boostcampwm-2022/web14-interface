import React from 'react';
import { css } from '@emotion/react';
import Test from 'src/components/Test/Test';
import { ReactComponent as Alert } from '@assets/alert.svg';

const testCSS = () => css`
	background-color: green;
	color: red;
`;

function App() {
	return (
		<div css={testCSS} className="App">
			hello world!
			<Alert />
		</div>
	);
}

export default App;
