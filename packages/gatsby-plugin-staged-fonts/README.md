<p align="center">
  <a href="https://zoe.lundegaard.ai">
    <img alt="Zoe.ai logo" src="../../zoe-ai-logo.svg" width="120" />
  </a>
</p>
<p align="center">
  <a href="https://lundegaard.eu">
    <img alt="by Lundegaard" src="../../by-Lundegaard.png" width="120" />
  </a>
</p>
<h1 align="center">Gatsby-plugin-staged-fonts</h1>

#

## Description

Implementation of [Critical FOFT with Data URI](https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft-data-uri)

1. It generates font-faces based on configuration of plugin and inlines the `<style>` into `<head>`.
2. Provides `useStagedFonts` hook which returns the number of the font loading stage.
3. Waits till the fonts are loaded before the stage is changed to `1`. Compatible with older browsers.

## Install

```
yarn add @fast-ai/gatsby-plugin-staged-fonts -D
```

or
```

npm install @fast-ai/gatsby-plugin-staged-fonts -D
```

## How to use

```js
const fontsPath = path.resolve(__dirname, '../files');

const getFontFile = (url) => ({
  url: path.join(fontsPath, url),
});

module.exports = {
	plugins: [{
		resolve: require.resolve('@fast-ai/gatsby-plugin-staged-fonts'),
		options: {
			// Describe your fonts
			fonts: [{
				// Critical fonts are loaded in the critical stage.
				// It should  contains only few glyphs, normally alpha-numeric symbols.
				critical: true,
				files: [
					getFontFile('open-sans-v17-latin-ext_latin-700-critical.woff'),
					getFontFile('open-sans-v17-latin-ext_latin-700-critical.woff2'),
				],
				family: 'Open Sans Critical',
				style: 'normal',
				weight: 400,
			}, {
				files: [
					getFontFile('open-sans-v17-latin-ext_latin-regular.woff'),
					getFontFile('open-sans-v17-latin-ext_latin-regular.woff2'),
				],
				family: 'Open Sans',
				style: 'normal',
				weight: 400,
			}, {
				files: [
					getFontFile('open-sans-v17-latin-ext_latin-700.woff'),
					getFontFile('open-sans-v17-latin-ext_latin-700.woff2'),
				],
				family: 'Open Sans',
				style: 'normal',
				weight: 700,
			}],
		},
	}]
};
```

## Options

- `alwaysLoadCriticalsFirst` (`boolean`) - if `true`, the session storage will not be used and the stage `0` will always happen, meaning that  critical fonts will be always used. This will eliminate FOUT but not the FOFT.
- `fonts` (`arrayOf(FontDescription)`) - Description of fonts used by the gatsby application

### `FontDescription`

- `critical` (`boolean`) - if `true`, the font will be loaded in stage `0`. Font files with this flag will be base64-encoded and inlined as a data URI in generated `@font-face`s.
- `family` (`string`) - Name of the font-family
- `style` (`string`) - Style of the font
- `weight` (`string|number`) - Weight of the font
- `files` (`arrayOf(FontFile)`) - Font files

### `FontFile`

- `url` (`string`) - "URL" of self-hosted font, meaning it should lead to file system. Font will be copied to the `public` folder.

## Hooks

### `useStagedFonts`
Returns the actual stage of font loading.

`useStagedFonts(options): props`

#### `options` (`object`)

##### `stage` (`number`)
- `0` - only critical fonts are loaded. Use only critical font families
- `1` - all fonts loaded it is safe to switch to non-critical font-families.

##### `isCriticalStage` (`boolean`)
Alias for `stage === 0`.

### Example - with css class
```js
import { useStagedFonts } from '@fast-ai/gatsby-plugin-staged-fonts';

const AppWithFonts = (props) => {
	const { isCriticalStage } = useStagedFonts();

	useEffect(
		() => {
			if (!isCriticalStage) {
				document.documentElement.className += " fonts-loaded";
			}
		},
		[isCriticalStage]
	);

	return <App {...props} />
};
```

### Example - with Rebass
```js
import { useStagedFonts } from '@fast-ai/gatsby-plugin-staged-fonts';

const Theme = ({ theme, ...rest }) => {
	const { isCriticalStage } = useStagedFonts();

	const themeWithResolvedFonts = useMemo(
		() => ({
			...theme,
			fonts: isCriticalStage
				// use critical fonts which are base64 encoded
				? {
						body: 'Roboto Critical',
						heading: 'Open Sans Critical',
					}
				: {
						body: 'Roboto',
						heading: 'Open Sans',
						mono: 'Roboto Mono',
					},
		}),
		[theme, isCriticalStage]
	);

	return <ThemeProvider theme={themeWithResolvedFonts} {...rest} />;
};
```
# More examples

See the @fast-ai themes:
- [gatsby-theme-fast-ai](https://github.com/lundegaard/gatsby-theme-fast-ai/tree/master/packages/gatsby-theme-fast-ai)
- [gatsby-theme-fast-ai-sidebar](https://github.com/lundegaard/gatsby-theme-fast-ai/tree/master/packages/gatsby-theme-fast-ai-sidebar)

# FAQ

## What is "critical" font?
It is a version of the "full" font, which contains only small amount of glyphs,
normally only alpha-numeric characters.
Meaning the font size is much smaller than a full blown font file.


# TODO

- local name of font

```css
@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 100;
	src: local('Roboto Thin'), local('Roboto-Thin'),
			 url('./files/roboto-v20-latin-ext_latin-100.eot?#iefix') format('embedded-opentype');
}
```
