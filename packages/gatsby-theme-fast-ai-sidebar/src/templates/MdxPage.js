import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/duotoneLight';
import { pathOr } from 'ramda';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Box, Col, Heading, Image, Link, Row, Text } from '@fast-ai/ui-components';

import warning from '../../content/assets/exclamation-triangle.svg';
import info from '../../content/assets/info-circle.svg';
import TableOfContents from '../components/TableOfContents';

import Page from './Page';

const H1 = props => <Heading as="h1" {...props} />;
const H2 = props => <Heading as="h2" {...props} />;
const H3 = props => <Heading as="h3" {...props} />;
const H4 = props => <Heading as="h4" {...props} />;
const H5 = props => <Heading as="h5" {...props} />;
const H6 = props => <Heading as="h6" {...props} />;

const Li = props => <Box as="li" fontSize={[2, 2, 2, 4]} mb="2" mt="2" {...props} />;

const Table = props => (
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
const TableHead = props => <Box as="th" variant="tableCol" {...props} />;
const TableRow = props => <Box as="tr" variant="tableRow" {...props} />;
const TableCol = props => <Box as="td" variant="tableCol" {...props} />;

const Code = props => (
	<Box
		as="code"
		sx={{
			p: '1px 2px',
			color: '#e8852b',
		}}
		{...props}
	/>
);
const CodeBox = props => <Box as="pre" p={[2, 3, 4]} {...props} />;

const getClassName = pathOr('', ['children', 'props', 'className']);
const getChildren = pathOr('', ['children', 'props', 'children']);
const getLanguage = pathOr('', ['groups', 'lang']);

const HighlightedCode = props => {
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

const InfoBox = props => (
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

const resolveIconType = type => {
	switch (type) {
		case 'info':
			return info;
		case 'warning':
			return warning;
		default:
			return null;
	}
};

const Icon = ({ type, ...props }) => (
	<Image
		src={resolveIconType(type)}
		alt="Icon"
		mr="1"
		sx={{ width: '17px', height: '15px' }}
		{...props}
	/>
);

Icon.propTypes = { type: PropTypes.string };

const components = {
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

const MdxPage = ({ location, data: { mdx }, ...rest }) => (
	<MDXProvider components={components}>
		<Page location={location} fullWidth={mdx.frontmatter.fullWidth} {...rest}>
			<Row>
				<Col span={{ _: 12, lg: 8 }}>
					<H1 mb={2}>{mdx.frontmatter.title}</H1>
				</Col>
			</Row>
			<Row flexDirection={{ _: 'column', lg: 'row-reverse' }}>
				<Col span={{ _: 12, lg: 4 }}>
					{!mdx.frontmatter.disableTableOfContents && (
						<TableOfContents
							maxDepth={mdx.frontmatter.tableOfContentsDepth}
							sx={{
								position: ['static', 'static', 'static', 'sticky'],
								top: 112,
								right: 0,
							}}
							location={location}
							items={mdx.tableOfContents.items}
						/>
					)}
				</Col>
				<Col span={{ _: 12, lg: 8 }}>
					<MDXRenderer>{mdx.body}</MDXRenderer>
				</Col>
			</Row>
		</Page>
	</MDXProvider>
);

export const pageQuery = graphql`
	query MdxPageQuery($id: String!) {
		mdx(id: { eq: $id }) {
			frontmatter {
				title
				tableOfContentsDepth
				disableTableOfContents
				fullWidth
			}
			id
			body
			tableOfContents
		}
	}
`;

MdxPage.propTypes = { children: PropTypes.node, location: PropTypes.object };

export default MdxPage;
