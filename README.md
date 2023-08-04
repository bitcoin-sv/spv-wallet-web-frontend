# BUX WALLET APP

The `bux-wallet-frontend` is a referential frontend application for a custodial web wallet. 
It is used in conjunction with the `bux-wallet-backend` component, which serves as the backend server.

## Running the project

`yarn` - install all dependencies

`yarn dev` - run vite dev server

`yarn lint` - verify project with using eslint

### Running backend locally

There are two way of running backend locally:

#### Using ./start-wallet.sh script 

`bux-wallet-frontend` provides a `start-wallet.sh` script
which is using `docker-compose.yml` file to starts up Bux Wallet Frontend, Backend and 
Bux Server with selected database and cache storage. To start, we need to fill the 
config json which we want to use, there is prepared custom config file `docker/envs/development.json`
which is used in development environment. This script build local image of bux-wallet-frontend and use 
already built ones for the rest of applications.

Ports which are used:
- 3002  - Bux wallet frontend
- 3003  - Bux server
- 5432  - PostgreSQL db
- 6379  - Redis
- 8080  - Bux wallet backend
- 27017 - MongoDB

There are three ways of running this script:
1. With manual configuration - every option is displayed in terminal and user can choose
   which applications should be started and configure how to run bux-server. Use command:
  ```bash
  ./start-wallet.sh
  ```
2. With flags which define how to set up docker services. Ever option is displayed when
   you ran the script with flag `-h` or `--help`. Possible options:

  ```bash
  ./start-wallet.sh --help

  Welcome in Bux Wallet!
  Usage: ./start-wallet.sh [OPTIONS]
  
  This script helps you to run Bux wallet and Bux server with your preferred database and cache storage.
  
  Options:
  <----------   BUX WALLET SECTION
    -bwf,  --bux-wallet-frontend	 Whether the bux-server should be run - true/false
    -bwb,  --bux-wallet-backend	 Whether the bux-server should be run - true/false
    -p,    --xpriv\t\t\t Define admin xPriv          
  <----------   BUX SERVER SECTION
    -db,  --database		 Define database - postgresql, mongodb, sqlite
    -c,   --cache			 Define cache storage - freecache(in-memory), redis
    -bs,  --bux-server		 Whether the bux-server should be run - true/false
    -env, --environment		 Define bux-server environment - development/staging/production
    -b,   --background		 Whether the bux-server should be run in background - true/false
    -x,   --xpub			 Define admin xPub
    -l,   --load			 Load .env.config file and run bux-server with its settings
  ```

  ```bash
  ./start-wallet.sh -db postgresql -c redis -bs true -env development -b false 
  ```
3. With `-l/--load` flag. This option add possibility to use previously created `.env.config` file and run whole environment with simple command:
  ```bash
  ./start-wallet.sh -l
  ```

#### Using docker compose
To run backend locally you can use docker compose

Before you use it, you need to create a file named
`bux-wallet-backend.env.private`
containing at least one entry:

`BUX_ADMIN_XPRIV=xprv...` where `xpriv...` should be replaced with valid admin xpriv

You can do this for example with this command (just replace <<admin_xpriv>> with valid admin xpriv)
```bash 
echo 'BUX_ADMIN_XPRIV=<<admin_xpriv>>' > bux-wallet-backend.env.private 
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
