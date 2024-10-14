/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-06-24 13:27:02
 */
module.exports = {
    extends: "stylelint-config-base/vue-sass",
    ignoreFiles: ["public/**/*.*", "**/static/**/*.*", ".nuxt/**/*.*"],
    rules: {
        "max-nesting-depth": [6, {}],
    },
};
