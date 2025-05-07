import { createRequire } from 'node:module';

import { createFilePath } from 'gatsby-source-filesystem';

const require = createRequire(import.meta.url);
export const createPages = async ({ graphql, actions }, { disableMdx }) => {
	const { createPage } = actions;

	if (disableMdx) {
		return;
	}

	const result = await graphql(`
		{
			allMdx(filter: { fields: { source: { eq: "docs" } } }) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							title
							description
							tableOfContentsDepth
							disableTableOfContents
							disableContentNavigation
						}
						internal {
							contentFilePath
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	const pages = result.data.allMdx.edges;

	pages.forEach(page => {
		const mdxPage = require.resolve('./src/templates/MdxPage.js');

		createPage({
			path: page.node.fields.slug,
			// component: mdxPage,
			component: `${mdxPage}?__contentFilePath=${page.node.internal.contentFilePath}`,
			context: {
				id: page.node.id,
				slug: page.node.fields.slug,
			},
		});
	});

	return null;
};

export const onCreateNode = ({ node, actions, getNode }, { disableMdx }) => {
	const { createNodeField } = actions;

	if (!disableMdx && node.internal.type === 'Mdx') {
		const value = createFilePath({ node, getNode });
		const parent = getNode(node.parent);

		const sourceInstanceName = parent.sourceInstanceName;

		createNodeField({
			name: 'slug',
			node,
			value,
		});

		createNodeField({
			name: 'source',
			node,
			value: sourceInstanceName,
		});
	}
};

export const createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
    type MdxFrontmatter implements Node {
			fullWidth: Boolean
			title: String
			description: String
			tableOfContentsDepth: Int
			disableTableOfContents: Boolean
			disableContentNavigation: Boolean
			disableBreadcrumbs: Boolean
    }
  `;

	createTypes(typeDefs);
};
