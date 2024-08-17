import typescript from "eslint-plugin-typescript";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [{
    plugins: {
        typescript,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-const-assign": "error",
        "no-class-assign": "error",
        "no-constructor-return": "error",
        "no-constant-condition": "error",
        "no-dupe-args": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-unreachable": "error",
        "no-unreachable-loop": "error",
        "no-use-before-define": "error",
        "block-scoped-var": "error",
        curly: "error",
        "default-case": "error",
        eqeqeq: "warn",
        "max-classes-per-file": "error",
        "no-console": "warn",
        "no-unused-private-class-members": "error",

        "no-unused-vars": ["error", {
            args: "none",
        }],

        "typescript/interface-name-prefix": ["error", "always"],
        "typescript/class-name-casing":  "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-empty-function": "error",
    },
},{
    files:['src/**/*.{ts,tsx}'],
}];