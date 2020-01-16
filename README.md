<p align="center">
  <a href="https://zoe.lundegaard.ai">
    <img alt="Zoe.ai logo" src="https://zoe.lundegaard.ai/images/zoe-ai.svg" width="120" />
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
yarn zoe start
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
│   ├── storybook
│   │   └── src
│   │       └── components
│   └── zoe
│       ├── content
│       │   └── assets
│       ├── src
│       │   ├── components
│       │   ├── gatsby-theme-fast-ai
│       │   ├── intl
│       │   └── pages
│       └── static
└── packages
    ├── gatsby-plugin-setup
    │   └── src
    ├── gatsby-theme-fast-ai
    │   ├── content
    │   │   └── assets
    │   └── src
    │       ├── components
    │       ├── hooks
    │       └── templates
    └── ui-components
        └── src
            ├── components
            ├── contexts
            ├── hooks
            ├── messages
            ├── types
            └── utils
```

### `zoe`
* example application
* shows how to integrate fast-ai's s-analytics module to React application

### `ui-components`
* common UI components

### `gatsby-plugin-setup`
* contains a few patches over default Gatsby configuration

### `gatsby-theme-fast-ai`
* contains common setup for Gatsby applications
* configures set of Gatsby plugins

