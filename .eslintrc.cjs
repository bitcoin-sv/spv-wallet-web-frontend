module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  "extends": [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    // turns off the rules which may conflict with prettier
    'prettier',
    'eslint-config-prettier',
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    project: "./tsconfig.json"
  },
  "plugins": [
    "react",
    "@emotion",
    "@typescript-eslint"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/self-closing-comp': [
      'warn',
      {
        'component': true,
        'html': true,
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@emotion/pkg-renaming': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/syntax-preference': [2, 'string'],
  }
}
