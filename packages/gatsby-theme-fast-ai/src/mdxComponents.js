import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { pathOr } from 'ramda';
import { Box, Heading, Image, Link, Text } from '@fast-ai/ui-components';

import warning from '../content/assets/exclamation-triangle.svg';
import info from '../content/assets/info-circle.svg';

const HeadingDivider = (props) => (
	<Box
		sx={{
			bottom: 0,
			left: 0,
			height: '4px',
			bg: 'secondary',
			width: 'calc(3rem)',
		}}
		{...props}
	/>
);
const HeadingWithDivider = (props) => (
	<Box sx={{ position: 'relative', mb: [3, 3] }}>
		<Heading {...props} />
		<HeadingDivider />
	</Box>
);

export const H1 = (props) => <Heading as="h1" {...props} />;
export const H2 = (props) => (
	<HeadingWithDivider as="h2" variant="subHeading1" {...props} />
);
export const H3 = (props) => (
	<Heading as="h3" variant="subHeading2" {...props} />
);
export const H4 = (props) => (
	<Heading as="h4" variant="subHeading3" {...props} />
);
export const H5 = (props) => (
	<Heading as="h5" variant="subHeading4" {...props} />
);

const Li = (props) => (
	<Box as="li" fontSize={[2, 2, 2, 4]} mb="2" mt="2" {...props} />
);

export const Table = (props) => (
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
export const TableHead = (props) => (
	<Box as="th" variant="tableCol" {...props} />
);
export const TableRow = (props) => (
	<Box as="tr" variant="tableRow" {...props} />
);
export const TableCol = (props) => (
	<Box as="td" variant="tableCol" {...props} />
);

export const Code = (props) => (
	<Box
		as="code"
		sx={{
			p: '1px 2px',
			color: '#e8852b',
		}}
		{...props}
	/>
);
const CodeBox = (props) => <Box as="pre" p={[2, 3, 4]} {...props} />;

const getClassName = pathOr('', ['children', 'props', 'className']);
const getChildren = pathOr('', ['children', 'props', 'children']);
const getLanguage = pathOr('', ['groups', 'lang']);

export const HighlightedCode = (props) => {
	const className = getClassName(props);
	const children = getChildren(props);
	const matches = className.match(/language-(?<lang>.*)/);
	const language = getLanguage(matches);

	return (
		<Highlight {...defaultProps} code={children.trim()} language={language}>
			{({ style, tokens, getLineProps, getTokenProps }) => (
				<CodeBox
					sx={{
						...style,
						fontSize: 1,
						maxWidth: '100%',
						overflowX: 'visible',
						overflowY: 'hidden',
					}}
				>
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

export const InfoBox = (props) => (
	<Box
		as="div"
		fontSize={[2, 2, 2, 4]}
		sx={{
			border: '1px solid',
			borderRadius: '3px',
			margin: '10px',
		}}
		{...props}
	/>
);

const resolveIconType = (type) => {
	switch (type) {
		case 'info':
			return info;
		case 'warning':
			return warning;
		default:
			return null;
	}
};

export const Icon = ({ type, ...props }) => (
	<Image
		src={resolveIconType(type)}
		alt="Icon"
		mr="1"
		sx={{ width: '17px', height: '15px' }}
		{...props}
	/>
);

Icon.propTypes = { type: PropTypes.string };

export const Paragraph = (props) => <Text as="p" mb={3} {...props} />;

export const components = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	p: Paragraph,
	a: Link,
	img: Image,
	pre: HighlightedCode,
	inlineCode: Code,
	table: Table,
	th: TableHead,
	tr: TableRow,
	td: TableCol,
	li: Li,
	Icon,
	InfoBox,
};
