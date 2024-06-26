# SPV WALLET WEB FRONTEND


The `spv-wallet-web-frontend` is a referential frontend app designed as a part of the **SPV Wallet** which is a custodial wallet for Bitcoin SV.
It utliizes the `spv-wallet` service as a non-custodial wallet in conjunction with the `spv-wallet-web-backend` as a backend server which is responsible for storing user data and private keys.

For in-depth information and guidance, please refer to the [SPV Wallet Documentation](https://docs.bsvblockchain.org/network-topology/applications/spv-wallet).


## Running the project

`yarn` - install all dependencies

`yarn dev` - run vite dev server

`yarn lint` - verify project with using eslint

### Running backend locally

There are two way of running backend locally:

#### Using ./start.sh script

`spv-wallet-web-frontend` provides a `start.sh` script, which is actually downloading and using the newest version of `start.sh` script from `spv-wallet` repository.

It is using `docker-compose.yml` file to starts up `SPV Wallet` with web-frontend, web-backend and selected database and cache storage.

There are three ways of running this script:

1. With manual configuration - every option is displayed in terminal and user can choose
   which applications should be started and configure how to run `spv-wallet`. Use command:

```bash
./start.sh
```

2. With flags which define how to set up docker services. Ever option is displayed when
   you ran the script with flag `-h` or `--help`.

```bash
./start.sh -db postgresql -c redis -sw true -b false
```

3. With `-l/--load` flag. This option add possibility to use previously created `.env.config` file and run whole environment with simple command:

```bash
./start.sh -l
```

### Repo structure

- `src/` - workspace app
  - `assets` - extra assets required to use inside components - images for example
  - `componets` - reusable components which create views and app
  - `styles` - global styles for app
  - _(optional)_ `hooks` - custom React hooks for app
  - _(optional)_ `views` - directory to place views which create application and include reusable components

### Directory structure

Every reusable component should be placed inside `src/components`. If any of the component categories
(directories starting with underscore, e.g. `_buttons`) is a good fit, the component should be placed there. Every
component should have its own directory named the same as the component. The directory should contain the following
files:

- `Component/`
  - `index.ts` - re-exporting anything needed
  - `Component.tsx` - component code
  - _(optional)_ `Component.styles.ts` - any styles needed for the component
  - _(optional)_ `Component.stories.tsx` - Storybook stories exploring different use cases/variants of the component

In terms of naming, `PascalCase` should be used for component names and Typescript types. Constants should be named
using `UPPER_CASE`. Everything else should use `camelCase`.

### Component structure

In the main component file, we try to preserve a following structure:

1. Hook calls
2. Derived state
3. Event handlers
4. Conditional returns

## License

[Open BSV License](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/LICENSE).
