// eslint-disable-next-line import/no-commonjs
module.exports = {
  root: true,
  extends: ['@modern-js-app'],
  plugins: ['react'],
  rules: {
    'react/no-unknown-property': [
      'error',
      { ignore: ['onPointerMove', 'onPointerDown', 'onPointerUp'] },
    ],
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['../tsconfig.json'],
  },
};
