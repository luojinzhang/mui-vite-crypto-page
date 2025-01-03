module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  env: {
    es6: true,
    browser: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
