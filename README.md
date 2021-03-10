<p align="center">
  <a href="https://zoe.lundegaard.ai">
    <img alt="Zoe.ai logo" src="zoe-ai-logo.svg" width="120" />
  </a>
</p>
<p align="center">
  <a href="https://lundegaard.eu">
    <img alt="by Lundegaard" src="by-Lundegaard.png" width="120" />
  </a>
</p>
<h1 align="center">Gatsby theme workspace for <a href="http://lundegaard.ai/" target="_blank">Fast AI platform</a></h1>

#

## Installing

```shell
git clone https://github.com/lundegaard/gatsby-theme-fast-ai my-app
cd my-app
yarn install
```

## Developping

Run demo app with gatsby-theme-fast-ai.

```shell
yarn start
```

Run demo app with gatsby-theme-fast-ai-sidebar.

```shell
yarn start:sidebar
```

## Running storybook

```shell
yarn storybook start
```

or

```shell
yarn start:storybook
```

## Project template

```text
.
├── apps
│   ├── demo
│   ├── demo-sidebar
│   └── storybook
├── packages
│   ├── gatsby-plugin-setup
│   ├── gatsby-plugin-staged-fonts
│   ├── gatsby-theme-fast-ai
│   ├── gatsby-theme-fast-ai-sidebar
│   └── ui-components
└── tools
```

### `demo`
* example application demostrating `fast-ai-gatsby-theme`

### `demo-sidebar`
* example application demostrating `fast-ai-gatsby-theme-sidebar`

### `storybook`
* Storybook app documenting the @fast-ai/ui-components

### `ui-components`
* common UI components

### `gatsby-plugin-setup`
* contains a few patches over default Gatsby configuration

### `gatsby-plugin-staged-fonts`
* Implements effective font loading strategy

### `gatsby-theme-fast-ai`
* contains common setup for Gatsby applications
* configures set of Gatsby plugins

### `gatsby-theme-fast-ai-sidebar`
* extension of `gatsby-theme-fast-ai` with fluid layout

## Related projects

- [Zoe s-analytics demo](https://github.com/lundegaard/fast-ai-zoe-demo) - React Web application with S-Analytics
- [@redux-tools](https://github.com/lundegaard/redux-tools) - Modular Redux is possible!
- [react-union](https://github.com/lundegaard/react-union) - Intergrate React apps into various CMSs seamlessly.
- [validarium](https://github.com/lundegaard/validarium) - Validations done right.

## License

All packages are distributed under the MIT license. See the license [here](https://github.com/lundegaard/gatsby-theme-fast-ai/blob/master/LICENSE).

