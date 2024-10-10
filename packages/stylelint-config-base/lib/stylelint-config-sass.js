/*
 * @Description: sass stylelint config
 * @Author: F-Stone
 * @LastEditTime: 2022-09-05 15:38:59
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
            { severity: "warning" },
        ],
        "plugin/declaration-block-no-ignored-properties": true,
        "scss/selector-no-redundant-nesting-selector": null,
        "scss/dollar-variable-pattern": "^[a-z][a-z0-9\\-_]*[a-z0-9]$",
    },
};
