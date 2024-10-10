/*
 * @Description: sass stylelint config
 * @Author: F-Stone
 * @LastEditTime: 2022-06-24 13:58:05
 */

module.exports = {
    extends: [
        "stylelint-config-sass-guidelines",
        "stylelint-prettier/recommended",
        "./stylelint-config-base-rules",
    ],
    plugins: [
        "stylelint-no-unsupported-browser-features",
        "stylelint-declaration-block-no-ignored-properties",
    ],
    rules: {
        "plugin/no-unsupported-browser-features": [
            true,
            {
                severity: "warning",
                ignore: [
                    "grid-template-columns",
                    "css-gradients",
                    "css3-cursors",
                    "css-appearance",
                ],
                ignorePartialSupport: true,
            },
        ],
        "plugin/declaration-block-no-ignored-properties": true,
        "scss/selector-no-redundant-nesting-selector": null,
        "scss/dollar-variable-pattern": "^[a-z][a-z0-9\\-_]*[a-z0-9]*$",
    },
    overrides: [
        {
            files: "**/*.ejs",
            customSyntax: "postcss-html",
        },
        {
            files: "**/*.html",
            customSyntax: "postcss-html",
        },
        {
            files: "**/*.vue",
            customSyntax: "postcss-html",
        },
    ],
};
