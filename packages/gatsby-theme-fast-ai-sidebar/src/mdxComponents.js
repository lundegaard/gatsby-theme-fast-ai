import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/duotoneLight';
import { pathOr } from 'ramda';
import { Box, Heading, Image, Link, Text } from '@fast-ai/ui-components';

import warning from '../content/assets/exclamation-triangle.svg';
import info from '../content/assets/info-circle.svg';

const HeadingDivider = (props) => (
	<Box sx={{ my: 3, height: '4px', bg: 'secondary', width: 'calc(3rem)' }} {...props} />
);
const HeadingWithDivider = (props) => (
	<Fragment>
		<Heading {...props} />
		<HeadingDivider />
	</Fragment>
);

export const H1 = (props) => <Heading as="h1" {...props} />;
export const H2 = (props) => <HeadingWithDivider as="h2" {...props} />;
export const H3 = (props) => <Heading as="h3" {...props} />;
export const H4 = (props) => <Heading as="h4" {...props} />;
export const H5 = (props) => <Heading as="h5" {...props} />;
export const H6 = (props) => <Heading as="h6" {...props} />;

export const Li = (props) => <Box as="li" fontSize={[2, 2, 2, 4]} mb="2" mt="2" {...props} />;

export const Table = (props) => (
	<Box
		sx={{
			maxWidth: '100%',
			overflowX: 'auto',
			overflowY: 'hidden',
			maskImage: 'linear-gradient(to right,transparent,white 0.5rem,white 97%,transparent)',
			px: 1,
		}}
	>
		<Box
			as="table"
			sx={{
				minWidth: '100%',
			}}
			variant="table"
			{...props}
		/>
	</Box>
);
export const TableHead = (props) => <Box as="th" variant="tableCol" {...props} />;
export const TableRow = (props) => <Box as="tr" variant="tableRow" {...props} />;
export const TableCol = (props) => <Box as="td" variant="tableCol" {...props} />;

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
export const CodeBox = (props) => <Box as="pre" p={[2, 3, 4]} {...props} />;

export const getClassName = pathOr('', ['children', 'props', 'className']);
export const getChildren = pathOr('', ['children', 'props', 'children']);
export const getLanguage = pathOr('', ['groups', 'lang']);

export const HighlightedCode = (props) => {
	const className = getClassName(props);
	const children = getChildren(props);
	const matches = className.match(/language-(?<lang>.*)/);
	const language = getLanguage(matches);

	return (
		<Highlight
			{...defaultProps}
			theme={{ ...prismTheme, plain: { ...prismTheme.plain, backgroundColor: '#fff' } }}
			code={children.trim()}
			language={language}
		>
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

const InfoBox = (props) => (
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

export const resolveIconType = (type) => {
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

export const components = {
	h1: H2,
	h2: H3,
	h3: H4,
	h4: H5,
	h5: H6,
	p: Text,
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
