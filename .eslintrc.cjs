/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,

  //   custom rules
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "require-await": "off",
    "@typescript-eslint/require-await": "off",
  },
};
