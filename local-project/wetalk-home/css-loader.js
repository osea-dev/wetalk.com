import path from "path";
import { interpolateName } from "loader-utils";
import cssesc from "cssesc";

function normalizePath(file) {
    return path.sep === "\\" ? file.replace(/\\/g, "/") : file;
}

const filenameReservedRegex = /[<>:"/\\|?*]/g;
// eslint-disable-next-line no-control-regex
const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;
export function defaultGetLocalIdent(
    loaderContext,
    localIdentName,
    localName,
    options
) {
    const { context, hashPrefix } = options;
    const { resourcePath } = loaderContext;
    const request = normalizePath(path.relative(context, resourcePath));

    // eslint-disable-next-line no-param-reassign
    options.content = `${hashPrefix + request}\x00${unescape(localName)}`;

    // Using `[path]` placeholder outputs `/` we need escape their
    // Also directories can contains invalid characters for css we need escape their too
    const name = cssesc(
        interpolateName(loaderContext, localIdentName, options)
            // For `[hash]` placeholder
            .replace(/^((-?[0-9])|--)/, "_$1")
            .replace(filenameReservedRegex, "-")
            .replace(reControlChars, "-")
            .replace(/\./g, "-"),
        { isIdentifier: true }
    ).replace(/\\\[local\\]/gi, localName);
    return name.replace(/\+/gi, "-");
}
