/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-08-31 15:15:36
 */

module.exports = {
    extends: ["plugin:base/ts"],
    parserOptions: {
        requireConfigFile: false,
    },
    globals: { Generator: "readonly" },
};
