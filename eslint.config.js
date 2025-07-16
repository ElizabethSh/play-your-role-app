import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Custom ESLint rules:
      "no-console": "warn",
      "no-debugger": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages. `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            [
              "^(components|pages|utils|hooks|config|vendored-lib|icons|settings|types)(/.*|$)",
            ],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // svg imports.
            ["^.+\\.svg$"],
            // Style imports.
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  }
);
