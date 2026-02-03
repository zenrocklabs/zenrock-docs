![Banner!](/docs/static/img/banner.png)

# Zenrock Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Here we are covering the Zenrock protocol stack, including zrChain, zenBTC and zenTP - Zenrock's products to expose the power of MPC to the masses.

## Contributing to Zenrock Docs

### Guidelines
Contributing to the docs site is a great way to get involved in the dev community and help other developers along the way! Check out our guidelines [here](./CONTRIBUTING.md).

## Installation

```bash
$ yarn
yarn install v1.22.19
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
✨  Done in 0.10s.
```

### Local Development

```bash
$ yarn start
yarn run v1.22.19
$ docusaurus start
Starting the development server...
Docusaurus website is running at: http://localhost:3000/
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
$ yarn build
yarn run v1.22.19
$ docusaurus build
[INFO] Docusaurus website is being built...
[SUCCESS] Generated static files in "build"
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
$ USE_SSH=true yarn deploy
yarn run v1.22.19
$ docusaurus deploy
[INFO] Deploying to GitHub pages...
[SUCCESS] Deployed to GitHub pages!
```

Not using SSH:

```bash
$ GIT_USER=<Your GitHub username> yarn deploy
yarn run v1.22.19
$ docusaurus deploy
[INFO] Deploying to GitHub pages...
[SUCCESS] Deployed to GitHub pages!
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
