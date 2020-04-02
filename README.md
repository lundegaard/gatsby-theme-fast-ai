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

```shell
yarn examples start
```
or

```shell
yarn start
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
│   ├── docs-examples
│   └── storybook
├── packages
│   ├── gatsby-plugin-setup
│   ├── gatsby-theme-fast-ai
│   └── ui-components
└── tools
```

### `examples`
* example application

### `ui-components`
* common UI components

### `gatsby-plugin-setup`
* contains a few patches over default Gatsby configuration

### `gatsby-theme-fast-ai`
* contains common setup for Gatsby applications
* configures set of Gatsby plugins

