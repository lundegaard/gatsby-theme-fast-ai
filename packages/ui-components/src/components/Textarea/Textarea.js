import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TextareaControl from '../TextareaControl';
import FormField from '../FormField';
import Text from '../Text';

const Textarea = ({ value, maxCharacters, afterControl, ...otherProps }) => (
	<FormField
		control={TextareaControl}
		kind="textarea"
		value={value}
		{...otherProps}
		afterControl={
			maxCharacters ? (
				<Fragment>
					<Text className="form-group__counter">
						{value.length} / {maxCharacters}
					</Text>
					{afterControl}
				</Fragment>
			) : (
				afterControl
			)
		}
	/>
);

Textarea.propTypes = {
	afterControl: PropTypes.node,
	maxCharacters: PropTypes.number,
	validate: PropTypes.arrayOf(PropTypes.func),
	value: PropTypes.string,
};

Textarea.defaultProps = {
	validate: [],
};

export default Textarea;
