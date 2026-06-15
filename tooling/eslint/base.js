module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", "build", ".turbo", "node_modules", "coverage"],
  rules: {
    "no-console": "off",
  },
};
