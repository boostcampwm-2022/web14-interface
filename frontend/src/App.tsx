/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const testCSS = () => css`
	background-color: black;
	color: red;
`;

function App() {
	return (
		<div css={testCSS} className="App">
			hello world!
		</div>
	);
}

export default App;
