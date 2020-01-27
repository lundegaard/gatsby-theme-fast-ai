import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { pathOr } from 'ramda';
import { Box, Heading, Image, Link, Text } from '@fast-ai/ui-components';

import Page from './Page';

const H1 = props => <Heading as="h1" {...props} />;
const H2 = props => <Heading as="h2" {...props} />;
const H3 = props => <Heading as="h3" {...props} />;
const H4 = props => <Heading as="h4" {...props} />;
const H5 = props => <Heading as="h5" {...props} />;

const Table = props => (
	<Box
		sx={{
			maxWidth: '100%',
			overflowX: 'auto',
			overflowY: 'hidden',
		}}
	>
		<Box as="table" variant="table" {...props} />
	</Box>
);
const TableHead = props => <Box as="th" variant="tableCol" {...props} />;
const TableRow = props => <Box as="tr" variant="tableRow" {...props} />;
const TableCol = props => <Box as="td" variant="tableCol" {...props} />;

const CodeBox = props => <Box as="pre" p={[2, 3, 4]} {...props} />;

const Code = props => {
	const className = pathOr('', ['children', 'props', 'className'], props);
	const children = pathOr('', ['children', 'props', 'children'], props);
	const matches = className.match(/language-(?<lang>.*)/);
	const language = pathOr('', ['groups', 'lang'], matches);

	return (
		<Highlight {...defaultProps} code={children.trim()} language={language}>
			{({ style, tokens, getLineProps, getTokenProps }) => (
				<CodeBox sx={{ ...style, fontSize: 1 }}>
					{tokens.map((line, i) => (
						<Box {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<Box as="span" {...getTokenProps({ token, key })} />
							))}
						</Box>
					))}
				</CodeBox>
			)}
		</Highlight>
	);
};

const components = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	p: Text,
	a: Link,
	img: Image,
	pre: Code,
	table: Table,
	th: TableHead,
	tr: TableRow,
	td: TableCol,
};

const MdxPage = ({ children }) => (
	<MDXProvider components={components}>
		<Page>{children}</Page>
	</MDXProvider>
);

MdxPage.propTypes = { children: PropTypes.node };

export default MdxPage;
