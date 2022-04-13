import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Col, Heading, Row } from '@fast-ai/ui-components';

import TableOfContents from '../components/TableOfContents';
import MdxProvider from '../components/MdxProvider';
import Seo from '../components/Seo';

import Page from './Page';

const MdxPage = ({ location, children, data: { mdx }, ...rest }) => {
	const {
		disableTableOfContents,
		disableBreadcrumbs,
		description,
		tableOfContentsDepth,
		fullWidth: deprecatedFullwidth,
		disableContentNavigation,
		title,
	} = mdx.frontmatter;
	return (
		<MdxProvider>
			<Page
				location={location}
				fluidLayout
				showContentNavigation={
					!deprecatedFullwidth || !disableContentNavigation
				}
				disableBreadcrumbs={disableBreadcrumbs}
				{...rest}
			>
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
						{children}
					</Col>
				</Row>
			</Page>
		</MdxProvider>
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
				disableBreadcrumbs
				disableContentNavigation
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
