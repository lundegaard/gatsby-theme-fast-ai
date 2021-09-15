import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';

import m from '../messages';

const Seo = ({ description = '', meta = [], title }) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						author
						title
						description
					}
				}
			}
		`,
	);
	const intl = useIntl();

	const metaDescription =
		description ||
		intl.formatMessage(m.siteDescription) ||
		site.siteMetadata.description;

	return (
		<Helmet
			title={title}
			titleTemplate={`%s - ${
				intl.formatMessage(m.siteTitle) || site.siteMetadata.title
			}`}
			meta={[
				{
					name: 'description',
					content: metaDescription,
				},
				{
					property: 'og:title',
					content: title,
				},
				{
					property: 'og:description',
					content: metaDescription,
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:creator',
					content: intl.formatMessage(m.siteAuthor) || site.siteMetadata.author,
				},
				{
					name: 'twitter:title',
					content: title,
				},
				{
					name: 'twitter:description',
					content: metaDescription,
				},
			].concat(meta)}
		/>
	);
};

Seo.propTypes = {
	description: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
};

export default Seo;
