import React from 'react';
import PropTypes from 'prop-types';

// <TextField error="Error" value={1} onChange={() => {}} />

// - chrome autofill
// - aria
// - label id sync
// - focus
// - floating label

const SuperField = ({ children, ...rest }) => <input type="text" {...rest} />;

// export const TextField = props => (
// 		<FormField>
// 			<FormFieldLabel />
// 			<Input />
// 			<FormFieldErrorText />
// 		</FormField>
// 	);

export default SuperField;
