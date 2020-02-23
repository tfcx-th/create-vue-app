module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: ["error", 4],
    semi: ["error", "never"],
    "no-console": "off",
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "never"]
  },
};
