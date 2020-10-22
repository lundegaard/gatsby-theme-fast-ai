const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions }, { disableMdx }) => {
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

	pages.forEach((page) => {
		const mdxPage = require.resolve('./src/templates/MdxPage.js');

		createPage({
			path: page.node.fields.slug,
			component: mdxPage,
			context: {
				id: page.node.id,
				slug: page.node.fields.slug,
			},
		});
	});

	return null;
};

exports.onCreateNode = ({ node, actions, getNode }, { disableMdx }) => {
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

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
    type MdxFrontmatter implements Node {
			fullWidth: Boolean
			title: String
			description: String
			tableOfContentsDepth: Int
			disableTableOfContents: Boolean
    }
  `;

	createTypes(typeDefs);
};
