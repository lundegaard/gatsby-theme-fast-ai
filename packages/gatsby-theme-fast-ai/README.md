# `gastby-theme-fast-ai`

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

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-fast-ai",
      options: {},
    },
  ],
}
```

That's it, you can now run your gatsby site using

```shell
yarn gatsby develop
```

Note that this site doesn't _do_ anything, so you're see a missing
resources error. Create a simple page in `src/pages/index.js` to see a
page on the root url.

```javascript
import React from "react"

export default () => <div>My Site!</div>
```
