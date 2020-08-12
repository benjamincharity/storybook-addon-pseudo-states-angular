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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyCssLoaderModuleOption = exports.addPostCSSLoaderToRules = exports.filterRules = exports.cssLoaderOptionsDefault = exports.postCSSOptionsDefault = void 0;
var postcss_pseudo_classes_1 = __importDefault(require("postcss-pseudo-classes"));
var postCssLoaderName = 'postcss-loader';
exports.postCSSOptionsDefault = {
    blacklist: [':root', ':host', ':host-context', ':nth-child', ':nth-of-type'],
};
var cssLoaderName = 'css-loader';
exports.cssLoaderOptionsDefault = {
    modules: {
        localIdentName: '[path][name]__[local]',
    },
};
exports.filterRules = function (rules, conditions) {
    var ruleReferences = [];
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        if (rule.test) {
            var ruleCondition = rule.test;
            for (var _a = 0, conditions_1 = conditions; _a < conditions_1.length; _a++) {
                var condition = conditions_1[_a];
                if (ruleCondition === rule) {
                    ruleReferences.push(rule);
                }
                if (ruleCondition.toString() === condition.toString()) {
                    ruleReferences.push(rule);
                }
            }
        }
        if (rule.oneOf) {
            var subRules = rule.oneOf;
            var filteredSubRules = exports.filterRules(subRules, conditions);
            for (var _b = 0, filteredSubRules_1 = filteredSubRules; _b < filteredSubRules_1.length; _b++) {
                var filterdRule = filteredSubRules_1[_b];
                ruleReferences.push(filterdRule);
            }
        }
    }
    return ruleReferences;
};
var addPostCssLoader = function (use, postCssLoaderOptions) {
    if (typeof use === 'string' && use.includes(postCssLoaderName)) {
        return {
            loader: postCssLoaderName,
            options: {
                plugins: function () { return [postcss_pseudo_classes_1.default(postCssLoaderOptions)]; },
            },
        };
    }
    if (typeof use === 'function') {
        return function (data) {
            var useFnResult = use(data);
            return addPostCssLoader(useFnResult, postCssLoaderOptions);
        };
    }
    if (Array.isArray(use)) {
        for (var _i = 0, use_1 = use; _i < use_1.length; _i++) {
            var item = use_1[_i];
            addPostCssLoader(item, postCssLoaderOptions);
        }
        return use;
    }
    var useItem = use;
    if ((useItem === null || useItem === void 0 ? void 0 : useItem.loader) && useItem.loader.includes(postCssLoaderName)) {
        if (useItem.options) {
            var plugins_1 = useItem.options.plugins;
            if (plugins_1) {
                if (typeof plugins_1 === 'string') {
                    useItem.options.plugins = [
                        postcss_pseudo_classes_1.default(postCssLoaderOptions),
                    ];
                }
                else if (Array.isArray(plugins_1)) {
                    useItem.options.plugins.add(postcss_pseudo_classes_1.default(postCssLoaderOptions));
                    useItem.options.plugins.add(function () {
                        return postcss_pseudo_classes_1.default(postCssLoaderOptions);
                    });
                }
                else if (typeof plugins_1 === 'function') {
                    var overwrittenPostCssFn = function () { return [
                        plugins_1,
                        postcss_pseudo_classes_1.default(postCssLoaderOptions),
                    ]; };
                    useItem.options.plugins = overwrittenPostCssFn;
                }
                else {
                    useItem.options.plugins = __assign(__assign({}, plugins_1), function () { return postcss_pseudo_classes_1.default(postCssLoaderOptions); });
                }
            }
        }
        else {
            useItem.options = {
                plugins: [postcss_pseudo_classes_1.default(postCssLoaderOptions)],
            };
        }
        return use;
    }
    return use;
};
exports.addPostCSSLoaderToRules = function (rules, postCssLoaderOptions) {
    for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
        var rule = rules_2[_i];
        if (rule.use) {
            rule.use = addPostCssLoader(rule.use, postCssLoaderOptions);
        }
        else {
        }
    }
};
var modifyCssLoader = function (use, cssLoaderOptions) {
    if (typeof use === 'string' && use.includes(cssLoaderName)) {
        return {
            loader: cssLoaderName,
            options: __assign({}, cssLoaderOptions),
        };
    }
    if (typeof use === 'function') {
        return function (data) {
            var useFnResult = use(data);
            return modifyCssLoader(useFnResult, cssLoaderOptions);
        };
    }
    if (Array.isArray(use)) {
        for (var _i = 0, use_2 = use; _i < use_2.length; _i++) {
            var item = use_2[_i];
            modifyCssLoader(item, cssLoaderOptions);
        }
        return use;
    }
    var useItem = use;
    if ((useItem === null || useItem === void 0 ? void 0 : useItem.loader) && useItem.loader.includes(cssLoaderName)) {
        if (useItem.options) {
            var modules = useItem.options.modules;
            if (modules) {
                if (typeof modules === 'string' && modules === 'true') {
                    useItem.options.modules = cssLoaderOptions.modules;
                }
                else if (typeof modules === 'boolean' && modules) {
                    useItem.options.modules = cssLoaderOptions.modules;
                }
                else {
                    if (useItem.options &&
                        useItem.options.modules &&
                        useItem.options.modules.getLocalIdent) {
                        delete useItem.options.modules.getLocalIdent;
                    }
                    useItem.options.modules = __assign(__assign({}, useItem.options.modules), cssLoaderOptions === null || cssLoaderOptions === void 0 ? void 0 : cssLoaderOptions.modules);
                }
            }
        }
        else {
            useItem.options = __assign({}, cssLoaderOptions);
        }
        return use;
    }
    return use;
};
exports.modifyCssLoaderModuleOption = function (rules, cssLoaderOptions) {
    for (var _i = 0, rules_3 = rules; _i < rules_3.length; _i++) {
        var rule = rules_3[_i];
        if (rule.use) {
            rule.use = modifyCssLoader(rule.use, cssLoaderOptions);
        }
        else {
        }
    }
};
//# sourceMappingURL=preset-utils.js.map