import React from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/core';

const CssBaseline = ({ styles }) => (
	<Global
		styles={css`
			html {
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				box-sizing: border-box;
			}
			html,
			body {
				height: 100%;
			}
			*,
			*::before,
			*::after {
				box-sizing: inherit;
			}
			strong,
			b {
				font-weight: bolder;
			}
			body {
				margin: 0;
			}

			body.modal--opened {
				overflow-y: hidden;
			}
			${styles}
		`}
	/>
);

CssBaseline.propTypes = {
	styles: PropTypes.string,
};

export default CssBaseline;
