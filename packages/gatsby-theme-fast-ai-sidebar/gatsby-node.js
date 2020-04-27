const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			allMdx {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							title
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

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === 'Mdx') {
		const value = createFilePath({ node, getNode });

		createNodeField({
			name: 'slug',
			node,
			value,
		});
	}
};
