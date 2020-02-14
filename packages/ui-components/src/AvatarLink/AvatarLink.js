import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import Link from '../Link';

const AvatarLink = ({ sx, ...rest }) => (
	<Avatar
		as={Link}
		sx={{
			textDecoration: 'none',

			'&, :visited': {
				opacity: 1,
				transition:
					'background-color 200ms ease-in-out, border 200ms ease-in-out, color 200ms ease-in-out',
			},
			':hover,:focus': {
				backgroundColor: 'transparent',
				borderColor: 'white',
				color: 'contrast',
			},
			...sx,
		}}
		{...rest}
	/>
);

AvatarLink.propTypes = {
	sx: PropTypes.object,
};

export default AvatarLink;
