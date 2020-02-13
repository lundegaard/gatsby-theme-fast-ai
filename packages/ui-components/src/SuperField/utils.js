import { both, complement } from 'ramda';
import { isNilOrEmpty, isPlainObject } from 'ramda-extension';

export const isInputValueEmpty = both(isNilOrEmpty, complement(isPlainObject));
