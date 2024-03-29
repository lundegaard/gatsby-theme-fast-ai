import React from 'react';
import PropTypes from 'prop-types';
import { Box, TransparentSelect } from '@fast-ai/ui-components';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import { isNotEmpty } from 'ramda-extension';

const LanguageSwitcher = ({ sx, ...rest }) => (
	<IntlContextConsumer>
		{({ language: currentLanguage, languages }) =>
			languages &&
			isNotEmpty(languages) && (
				<Box sx={{ minWidth: '60px', ...sx }}>
					<TransparentSelect
						name="language"
						onChange={event => changeLocale(event.target.value)}
						value={currentLanguage}
						{...rest}
					>
						{languages.map(language => (
							<option key={language} value={language}>
								{language}
							</option>
						))}
					</TransparentSelect>
				</Box>
			)
		}
	</IntlContextConsumer>
);
LanguageSwitcher.propTypes = { sx: PropTypes.object };

export default LanguageSwitcher;
