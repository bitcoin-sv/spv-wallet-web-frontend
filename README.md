# BUX WALLET APP

## Running the project

`yarn` - install all dependencies

`yarn dev` - run vite dev server

`yarn lint` - verify project with using eslint

### Running backend locally

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
