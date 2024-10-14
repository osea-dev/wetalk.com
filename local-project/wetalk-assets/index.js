exports.emailVerify = function emailVerify(value) {
    if (!/.+/.test(value.trim())) {
        return "请填写有效邮箱";
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value.trim())) {
        return "请填写有效邮箱";
    }
    return "";
};

exports.pwVerify = function pwVerify(value) {
    if (!/.+/.test(value)) {
        return "请填写密码";
    }
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)) {
        return "密码必需包含字母和数字，且在6-18位之间";
    }
    return "";
};

exports.emptyCheck = function emptyCheck(value) {
    return !/.+/.test(value.trim());
};
