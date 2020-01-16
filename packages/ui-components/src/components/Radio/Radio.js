import React from 'react';

import RadioControl from '../RadioControl';
import FormField from '../FormField';

const Radio = props => <FormField control={RadioControl} kind="radio" {...props} />;

export default Radio;
