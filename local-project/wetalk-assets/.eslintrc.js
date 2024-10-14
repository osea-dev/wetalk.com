/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-08-31 17:24:26
 */

module.exports = {
    extends: ["plugin:base/vue"],
    parserOptions: {
        requireConfigFile: false,
    },
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "vue/multi-word-component-names": 0,
    },
    globals: { Generator: "readonly", $: "readonly", gsap: "readonly" },
    ignorePatterns: ["public/**/*.js", "static/**/*.js"],
};
