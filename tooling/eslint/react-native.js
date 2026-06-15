module.exports = {
  extends: ["./base.js"],
  env: {
    browser: true,
    node: true,
    es2022: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    __DEV__: "readonly",
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "off",
  },
};
