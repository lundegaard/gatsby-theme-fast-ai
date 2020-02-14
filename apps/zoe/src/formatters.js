import React from 'react';
import { FormattedMessage, FormattedNumber } from 'gatsby-theme-fast-ai';
import PropTypes from 'prop-types';

import m from './intl/messages';

export const AmountFormatter = ({ children }) =>
	children != null ? (
		<FormattedNumber value={children} minimumFractionDigits={1} maximumFractionDigits={1}>
			{value => value.replace(/.$/, '-')}
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

	const monthsMessage = <FormattedMessage {...m.durationValueMonths} values={{ months }} />;
	const yearsMessage = <FormattedMessage {...m.durationValueYears} values={{ years }} />;

	if (!years) {
		return monthsMessage;
	}
	if (!months) {
		return yearsMessage;
	}

	return (
		<FormattedMessage
			{...m.durationValueAnd}
			values={{ left: yearsMessage, right: monthsMessage }}
		/>
	);
};
DurationFormatter.propTypes = { children: PropTypes.node };

export const AgeFormatter = ({ children }) => (children ? `${children} years` : '');
AgeFormatter.propTypes = { children: PropTypes.node };
