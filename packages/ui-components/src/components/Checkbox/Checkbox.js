import React from 'react';

import CheckboxControl from '../CheckboxControl';
import FormField from '../FormField';

const Checkbox = props => <FormField control={CheckboxControl} kind="checkbox" {...props} />;

export default Checkbox;
