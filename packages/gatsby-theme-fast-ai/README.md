<h1 align="center">@fast-ai/gatsby-theme-fast-ai</h1>

#

## Quick Start

```shell
mkdir my-site
cd my-site
yarn init
# install gatsby-theme and it's dependencies
yarn add gatsby react react-dom gatsby-theme-fast-ai
```

Then add the theme to your `gatsby-config.js`. We'll use the long form
here for education purposes.

```js
module.exports = {
	siteMetadata,
	plugins: [
		{
			resolve: 'gatsby-theme-fast-ai',
			options: {
				intlOptions: {
					languages: ['en', 'cs'],
					path: `${__dirname}/src/intl`,
					defaultLanguage: 'cs',
				},
				siteMetadata: {
					author: 'Jerry Lundegaard',
					description: 'Beautiful site',
					title: 'FastAI Docs examples',
				}
			},
		},
	],
};
```

That's it, you can now run your gatsby site using

```shell
yarn gatsby develop
```

Note that this site doesn't _do_ anything, so you're see a missing
resources error. Create a simple page in `src/pages/index.mdx` to see a
page on the root url.

```mdx
# Welcome!

<Section>
	...to my MDX-powered site!
</Section>
```
## Options

### `intlOptions`
- Options of [`gatsby-plugin-intl`](https://github.com/wiziple/gatsby-plugin-intl)

### `siteMetadata`

- `title` - Page title
- `author` - SEO metadata
- `description` - SEO metadata

## See our related projects

- [Zoe s-analytics demo](https://github.com/lundegaard/fast-ai-zoe-demo) - React Web application with S-Analytics
- [@fast-ai/ui-components](https://github.com/lundegaard/gatsby-theme-fast-ai/tree/master/packages/ui-components) - React UI component library
- [@fast-ai/gatsby-plugin-staged-fonts](https://github.com/lundegaard/gatsby-theme-fast-ai/tree/master/packages/gatsby-plugin-staged-fonts) - Implementation of Critical FOFT with Data URI font loading strategy
- [gatsby-theme-fast-ai](https://github.com/lundegaard/gatsby-theme-fast-ai) - Gatsby theme for Zoe applications
- [@redux-tools](https://github.com/lundegaard/redux-tools) - Modular Redux is possible!
- [react-union](https://github.com/lundegaard/react-union) - Intergrate React apps into various CMSs seamlessly.
- [validarium](https://github.com/lundegaard/validarium) - Validations done right.

## License

All packages are distributed under the MIT license. See the license [here](https://github.com/lundegaard/gatsby-theme-fast-ai/blob/master/LICENSE).

© 2021 Lundegaard a.s.
