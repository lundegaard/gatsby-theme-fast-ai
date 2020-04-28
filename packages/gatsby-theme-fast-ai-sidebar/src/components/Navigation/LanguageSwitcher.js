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
				<Box
					sx={{
						flexShrink: 0,
						flexGrow: 1,
						width: '60px',
						...sx,
					}}
					{...rest}
				>
					<TransparentSelect
						name="language"
						onChange={event => changeLocale(event.target.value)}
						value={currentLanguage}
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
