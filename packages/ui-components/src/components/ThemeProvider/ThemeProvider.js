import React from 'react';
import { ThemeProvider as EmotionProvider } from 'emotion-theming';

const ThemeProvider = props => <EmotionProvider {...props} />;

export default ThemeProvider;
