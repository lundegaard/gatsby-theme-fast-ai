import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@fast-ai/ui-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import githubTheme from 'prism-react-renderer/themes/github';
import { pathOr } from 'ramda';

import Copy from './Copy';

const normalizeCode = (x) => x.trim().replace(/  /g, ' ');
const getClassName = pathOr('', ['children', 'props', 'className']);
const getChildren = pathOr('', ['children', 'props', 'children']);
const getLanguage = pathOr('', ['groups', 'lang']);

const prismTheme = {
	...githubTheme,
	plain: {
		...githubTheme.plain,
		backgroundColor: '#fff',
	},
};

const LineNo = (props) => (
	<Box
		as="span"
		sx={{
			display: 'inline-block',
			width: '2em',
			userSelect: 'none',
			opacity: '0.3',
		}}
		{...props}
	/>
);

const Pre = (props) => <Box as="pre" {...props} />;

export const HighlightedCode = (props) => {
	const className = getClassName(props);
	const children = getChildren(props);
	const matches = className.match(/language-(?<lang>.*)/);
	const language = getLanguage(matches);
	const { title, showLines, disableCopy } = props;

	const code = normalizeCode(children);

	return (
		<Highlight {...defaultProps} theme={prismTheme} code={code} language={language}>
			{({ style, tokens, getLineProps, getTokenProps }) => (
				<Pre
					sx={{
						...style,
						p: [1, 2, 3],
						position: 'relative',
						fontSize: 1,
						maxWidth: '100%',
						overflowX: 'visible',
						overflowY: 'hidden',
						borderWidth: '1px',
						borderStyle: 'solid',
						borderColor: 'gray.1',
					}}
				>
					{!disableCopy && (
						<Copy
							fileName={title}
							sx={{
								position: 'absolute',
								right: (t) => t.space[1] / 2,
								top: (t) => t.space[1] / 2,
							}}
							content={code}
						/>
					)}
					{tokens.map((line, i) => (
						<Box {...getLineProps({ line, key: i })}>
							{showLines && <LineNo>{i + 1}</LineNo>}
							{line.map((token, key) => (
								<Box as="span" {...getTokenProps({ token, key })} />
							))}
						</Box>
					))}
				</Pre>
			)}
		</Highlight>
	);
};
HighlightedCode.propTypes = {
	disableCopy: PropTypes.bool,
	showLines: PropTypes.bool,
	title: PropTypes.string,
};

export default HighlightedCode;
