import React from 'react';
import { FormattedNumber } from 'gatsby-theme-fast-ai';
import PropTypes from 'prop-types';

export const AmountFormatter = ({ children }) =>
	children ? (
		<FormattedNumber value={children} minimumFractionDigits={2}>
			{value => value.replace(/00$/, '')}
		</FormattedNumber>
	) : (
		''
	);
AmountFormatter.propTypes = { children: PropTypes.node };

export const DurationFormatter = ({ children }) => {
	if (children == null) {
		return '';
	}

	const totalMonths = Number(children);

	const years = Math.floor(totalMonths / 12);
	const months = totalMonths - years * 12;

	// TODO: react-form
	// if (!years) {
	// return <FormattedMessage {...m.durationMonths} values={{  months }} />;
	// }
	// if (!months) {
	// return <FormattedMessage {...m.durationYears} values={{  years }} />;
	// }

	// return <FormattedMessage {...m.duration} values={{ years, months }} />;

	return `${years} years and ${months}`;
};
DurationFormatter.propTypes = { children: PropTypes.node };

export const AgeFormatter = ({ children }) => (children ? `${children} years` : '');
AgeFormatter.propTypes = { children: PropTypes.node };
