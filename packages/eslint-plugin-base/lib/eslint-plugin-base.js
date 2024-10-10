/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-03-20 16:12:45
 */

const publicRules = {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": "off",
    "no-debugger": "off",
    "prefer-const": [
        "error",
        {
            destructuring: "all",
            ignoreReadBeforeAssign: false,
        },
    ],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/2462
    // "@typescript-eslint/no-useless-constructor": "error",
    // "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/no-use-before-define": "off",
    // "@typescript-eslint/interface-name-prefix": "off",
    // "@typescript-eslint/no-namespace": "off",
    // "@typescript-eslint/camelcase": "off",
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/ban-ts-ignore": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/ban-ts-comment": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
};

module.exports = {
    configs: {
        js: {
            root: true,
            parserOptions: {
                ecmaVersion: 13,
                sourceType: "module",
            },
            env: {
                browser: true,
                commonjs: true,
                es2022: true,
                node: true,
            },
            extends: ["eslint:recommended", "plugin:prettier/recommended"],
            plugins: ["@stone/base"],
            rules: publicRules,
        },
        "babel-js": {
            root: true,
            parser: "@babel/eslint-parser",
            parserOptions: {
                ecmaVersion: 13,
                sourceType: "module",
            },
            env: {
                browser: true,
                commonjs: true,
                es2022: true,
                node: true,
            },
            extends: ["eslint:recommended", "plugin:prettier/recommended"],
            plugins: ["@stone/base"],
            rules: publicRules,
        },
        ts: {
            root: true,
            parser: "@babel/eslint-parser",
            parserOptions: {
                ecmaVersion: 13,
                sourceType: "module",
            },
            env: {
                browser: true,
                commonjs: true,
                es2022: true,
                node: true,
            },
            extends: ["eslint:recommended", "plugin:prettier/recommended"],
            plugins: ["@stone/base"],
            rules: publicRules,
            overrides: [
                {
                    files: ["**/*.ts", "**/*.tsx"],
                    extends: [
                        "eslint:recommended",
                        "plugin:@typescript-eslint/recommended",
                        "plugin:prettier/recommended",
                    ],
                    parserOptions: {
                        parser: "@typescript-eslint/parser",
                    },
                    rules: {
                        "no-debugger": "off",
                        "@typescript-eslint/no-explicit-any": 0,
                        "@typescript-eslint/no-var-requires": 0,
                    },
                },
                {
                    files: ["**/*.d.ts"],
                    parserOptions: {
                        parser: "@typescript-eslint/parser",
                    },
                    rules: {
                        "@typescript-eslint/no-explicit-any": 0,
                        "@typescript-eslint/no-var-requires": 0,
                        "@typescript-eslint/no-unused-vars": 0,
                    },
                },
            ],
        },
        vue: {
            root: true,
            parser: "@babel/eslint-parser",
            parserOptions: {
                ecmaVersion: 13,
                sourceType: "module",
            },
            env: {
                browser: true,
                commonjs: true,
                es2022: true,
                node: true,
            },
            extends: ["eslint:recommended", "plugin:prettier/recommended"],
            plugins: ["@stone/base"],
            rules: publicRules,
            overrides: [
                {
                    files: ["**/*.ts", "**/*.tsx"],
                    extends: [
                        "eslint:recommended",
                        "plugin:@typescript-eslint/recommended",
                        "plugin:prettier/recommended",
                    ],
                    parserOptions: {
                        parser: "@typescript-eslint/parser",
                    },
                    rules: {
                        "no-debugger": "off",
                        "no-undef": "off",
                        "@typescript-eslint/no-explicit-any": 0,
                        "@typescript-eslint/no-var-requires": 0,
                    },
                },
                {
                    files: ["**/*.d.ts"],
                    parserOptions: {
                        parser: "@typescript-eslint/parser",
                    },
                    rules: {
                        "@typescript-eslint/no-explicit-any": 0,
                        "@typescript-eslint/no-var-requires": 0,
                        "@typescript-eslint/no-unused-vars": 0,
                    },
                },
                {
                    files: ["**/*.vue"],
                    extends: [
                        "plugin:vue/recommended",
                        "eslint:recommended",
                        "@vue/typescript/recommended",
                        "plugin:prettier/recommended",
                    ],
                    parserOptions: {
                        parser: "@typescript-eslint/parser",
                    },
                    rules: {
                        "@typescript-eslint/no-explicit-any": 0,
                        "@typescript-eslint/no-var-requires": 0,
                        "vue/no-v-for-template-key": "off",
                        "vue/no-v-html": "off",
                        "no-undef": "off",
                    },
                },
            ],
        },
    },
};
