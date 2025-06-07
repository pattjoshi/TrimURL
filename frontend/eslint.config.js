import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Syntax correctness
      "no-unused-vars": "error",
      "no-undef": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Semantic and accessibility checks
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          controlComponents: ["Input"],
        },
      ],
    },
  },
];
