var _ = require("lodash");

module.exports = {
    surround
};

let defaultOptions = {
    args: undefined,
    params: undefined,
    prependSemicolon: true,
    useStrict: true,
    trimCode: true
};

function surround(code, userOptions) {
    let options = _.merge({}, defaultOptions, userOptions);

    let useStrictLines = options.useStrict ? ["\"use strict\";", ""] : [];
    const trimmedCode = options.trimCode ? code.trim() : code;
    const prependedSemicolon = options.prependSemicolon ? ";" : "";
    const bindThis = options.bindThis ? ".bind(this)" : "";

    const { args, params } = getArgsAndParams(options);

    let lines = [
        `${prependedSemicolon}(function(${params}) {`,
        ...useStrictLines,
        trimmedCode,
        `}${bindThis}(${args}));`,
        ""
    ];

    return lines.join("\n");
}

function getArgsAndParams(options) {
    const params = options.params || options.args || [];
    const args = options.args || options.params || [];

    return {
        args: args.join(", "),
        params: params.join(", ")
    };
}
