"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackFinal = void 0;
var node_logger_1 = require("@storybook/node-logger");
var types_1 = require("../share/types");
var preset_utils_1 = require("../share/preset-utils");
function webpackFinal(webpackConfig, options) {
    var _a;
    if (webpackConfig === void 0) { webpackConfig = {}; }
    if (options === void 0) { options = {}; }
    node_logger_1.logger.info("=> Loading Pseudo States Addon Webpack config (Angular Cli)");
    var foo = JSON.stringify(options);
    node_logger_1.logger.info("thing: " + foo);
    console.log('foo: ', foo);
    if ((_a = webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules) {
        var postCSSDefaultOptions = __assign(__assign({}, preset_utils_1.postCSSOptionsDefault), { prefix: types_1.PseudoStatesDefaultPrefixAlternative, blacklist: [
                ':root',
                ':host',
                ':host-context',
                ':nth-child',
                ':nth-of-type',
            ] });
        var postCssLoaderOptions = (options === null || options === void 0 ? void 0 : options.postCssLoaderPseudoClassesPluginOptions) ? __assign(__assign({}, postCSSDefaultOptions), options.postCssLoaderPseudoClassesPluginOptions) : postCSSDefaultOptions;
        var rulesToApply = options === null || options === void 0 ? void 0 : options.rules;
        if (rulesToApply && rulesToApply.length > 0) {
            var rules = preset_utils_1.filterRules(webpackConfig.module.rules, rulesToApply);
            preset_utils_1.addPostCSSLoaderToRules(rules, postCssLoaderOptions);
        }
        else {
            var rules = preset_utils_1.filterRules(webpackConfig.module.rules, [
                /\.scss$|\.sass$/,
            ]);
            preset_utils_1.addPostCSSLoaderToRules(rules, postCssLoaderOptions);
        }
    }
    node_logger_1.logger.info("=> Added PostCSS postcss-pseudo-classes to enable pseudo states styles.");
    return webpackConfig;
}
exports.webpackFinal = webpackFinal;
//# sourceMappingURL=preset-postcss.js.map