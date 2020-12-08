# World Kart Championship

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The list of complete project dependencies can be found on file `package.json`, the main dependencies are:

- react 16.x
- redux
- redux-thunk
- typescript
- react-intl
- material-ui
- styled-components
- axios
- jest
- react-testing-library
- husky (pre-commit, pre-push)

## Clone the project and first ejecution on local environment

After clone the repository:

1. install the project dependencies, run `yarn` on folders

   - `/`
   - `/server`

2. Execute on local environment running `yarn start:local`

## Available Scripts

In the project directory, you can run:

### `yarn start:local`

Runs app in the development mode on local environment with api-mocks-server (/server)

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The api mocks server is running on `http://localhost:5000/api/`

### `yarn start`

Runs the app in the development mode with proxy for Apis to development server, right now is the same `yarn start:local`

### `yarn test`

Launches the test runner with in watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.\

### `yarn test:coverage`

Launches the test runner and generate the coverage report.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
