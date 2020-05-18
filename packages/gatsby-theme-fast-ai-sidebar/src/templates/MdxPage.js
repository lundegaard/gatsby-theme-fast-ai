import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Col, Heading, Row } from '@fast-ai/ui-components';

import TableOfContents from '../components/TableOfContents';
import Seo from '../components/Seo';
import { components } from '../mdxComponents';

import Page from './Page';

const MdxPage = ({ location, data: { mdx }, ...rest }) => {
	const {
		disableTableOfContents,
		description,
		tableOfContentsDepth,
		fullWidth,
		title,
	} = mdx.frontmatter;
	return (
		<MDXProvider components={components}>
			<Page location={location} fullWidth={fullWidth} {...rest}>
				<Seo title={title} description={description} />
				<Row>
					<Col span={{ _: 12, lg: 9 }}>
						<Heading>{title}</Heading>
					</Col>
				</Row>
				<Row flexDirection={{ _: 'column', lg: 'row-reverse' }}>
					{!disableTableOfContents && (
						<Col span={{ _: 12, lg: 3 }}>
							<TableOfContents
								maxDepth={tableOfContentsDepth}
								sx={{
									position: ['static', 'static', 'static', 'sticky'],
									top: 112,
									right: 0,
								}}
								location={location}
								items={mdx.tableOfContents.items}
							/>
						</Col>
					)}
					<Col span={{ _: 12, lg: disableTableOfContents ? 12 : 9 }}>
						<MDXRenderer>{mdx.body}</MDXRenderer>
					</Col>
				</Row>
			</Page>
		</MDXProvider>
	);
};
export const pageQuery = graphql`
	query MdxPageQuery($id: String!) {
		mdx(id: { eq: $id }) {
			frontmatter {
				title
				description
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
