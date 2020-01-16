import preset from '@rebass/preset';
import { mergeDeepRightAll } from 'ramda-extension';

export default userTheme =>
	mergeDeepRightAll([preset, { breakpointAliases: ['sm', 'md', 'lg', 'xl'] }, userTheme]);
