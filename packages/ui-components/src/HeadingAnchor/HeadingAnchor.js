import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Heading from '../Heading';
import IconButton from '../IconButton';
import IconInsertLink from '../IconInsertLink';

const Anchor = ({ to }) => (
	<IconButton
		as="a"
		href={to}
		size={22}
		sx={{
			m: 0,
			p: 0,
			ml: 2,
			verticalAlign: 'middle',
			cursor: 'pointer',
		}}
	>
		<IconInsertLink size={22} />
	</IconButton>
);
Anchor.propTypes = {
	to: PropTypes.string,
};
const getLink = (href) => {
	if (typeof window === 'undefined') {
		return '';
	}
	const { origin, search, pathname } = document.location;
	return `${origin + pathname + search}#${href}`;
};
const HeadingAnchor = ({ children, id, copyLink, ...rest }) => {
	const [inHover, setHover] = useState(false);
	const to = copyLink || getLink(id);

	return (
		<Heading
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			id={id}
			{...rest}
		>
			{children}
			{(id || copyLink) && inHover && <Anchor to={to} />}
		</Heading>
	);
};

HeadingAnchor.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	/** You can override the whole link. If not set the current location with
	 * `id` as the hash is used. */
	copyLink: PropTypes.string,
	id: PropTypes.string,
};

export default HeadingAnchor;
