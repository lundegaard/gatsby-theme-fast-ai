import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { Box } from '@fast-ai/ui-components';

import m from '../messages';
import { copyToClipboard } from '../utils';

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const Copy = ({ content, duration = 5000, fileName = '', trim, sx }) => {
	const [copied, setCopied] = useState(false);

	const label = copied
		? `${fileName ? `${fileName} ` : ''}copied to clipboard`
		: `${fileName ? `${fileName}: ` : ''}copy code to clipboard`;

	return (
		<Box
			as="button"
			name={label}
			disabled={copied}
			sx={{
				backgroundColor: 'transparent',
				border: 'none',
				cursor: 'pointer',
				fontSize: 1,
				fontFamily: 'heading',
				textTransform: 'uppercase',
				p: 1,
				transition: 'default',
				'&[disabled]': {
					cursor: 'not-allowed',
				},
				':not([disabled]):hover': {
					bg: 'primary',
					color: 'white',
				},
				...sx,
			}}
			onClick={async () => {
				await copyToClipboard(trim ? content.trim() : content);

				setCopied(true);

				await delay(duration);

				setCopied(false);
			}}
		>
			{copied ? (
				<FormattedMessage {...m.copied} />
			) : (
				<FormattedMessage {...m.copy} />
			)}
		</Box>
	);
};

Copy.propTypes = {
	content: PropTypes.string.isRequired,
	duration: PropTypes.number,
	fileName: PropTypes.string,
	sx: PropTypes.object,
	trim: PropTypes.bool,
};

export default Copy;
