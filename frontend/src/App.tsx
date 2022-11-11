import { css } from '@emotion/react';
import React from 'react';
// import Alert from 'assets/alert.svg';

const testCSS = () => css`
	background-color: black;
	color: red;
`;

function App() {
	return (
		<div css={testCSS} className="App">
			hello world!
			{/* <Alert /> */}
		</div>
	);
}

export default App;
