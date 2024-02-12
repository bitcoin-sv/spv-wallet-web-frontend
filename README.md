# SPV WALLET WEB FRONTEND

The `spv-wallet-web-frontend` is a referential frontend application for a custodial web wallet.
It is used in conjunction with the `spv-wallet-web-backend` component, which serves as the backend server.

## Running the project

`yarn` - install all dependencies

`yarn dev` - run vite dev server

`yarn lint` - verify project with using eslint

### Running backend locally

There are two way of running backend locally:

#### Using ./start.sh script

`spv-wallet-web-frontend` provides a `start.sh` script
which is using `docker-compose.yml` file to starts up `SPV Wallet` with web-frontend, web-backend and selected database and cache storage.

To start, we need to fill the
config json which we want to use, there is prepared custom config file `docker/envs/development.json`
which is used in development environment. This script build local image of spv-wallet-web-frontend and use
already built ones for the rest of applications.

Ports which are used:

- 3002 - SPV wallet web-frontend
- 8081 - SPV wallet web-backend
- 3003 - SPV wallet (core service)
- 5432 - PostgreSQL DB
- 6379 - Redis
- 8080 - Block Headers Service
- 27017 - MongoDB

There are three ways of running this script:

1. With manual configuration - every option is displayed in terminal and user can choose
   which applications should be started and configure how to run `spv-wallet`. Use command:

```bash
./start.sh
```

2. With flags which define how to set up docker services. Ever option is displayed when
   you ran the script with flag `-h` or `--help`.

```bash
./start.sh -db postgresql -c redis -bs true -env development -b false
```

3. With `-l/--load` flag. This option add possibility to use previously created `.env.config` file and run whole environment with simple command:

```bash
./start.sh -l
```

#### Using docker compose

To run backend locally you can use docker compose

Before you use it, you need to create a file named
`spv-wallet-web-backend.env.private`
containing at least one entry:

`SPV_WALLET_ADMIN_XPRIV=xprv...` where `xpriv...` should be replaced with valid admin xpriv

You can do this for example with this command (just replace <<admin_xpriv>> with valid admin xpriv)

```bash
echo 'SPV_WALLET_ADMIN_XPRIV=<<admin_xpriv>>' > spv-wallet-web-backend.env.private
```

Now all you need to do is to run command:

```bash
yarn backend
```

And you can play with the backend on localhost:8080
for example you can find there a swagger:

http://localhost:8080/swagger/index.html

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
