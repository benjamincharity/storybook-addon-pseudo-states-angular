"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseudoStateTool = void 0;
var react_1 = __importStar(require("react"));
var api_1 = require("@storybook/api");
var components_1 = require("@storybook/components");
var events_1 = require("./events");
var constants_1 = require("./constants");
exports.PseudoStateTool = function (props) {
    var _a = react_1.useState(false), isVisible = _a[0], setIsVisible = _a[1];
    var _b = react_1.useState(false), isDisabled = _b[0], setIsDisabled = _b[1];
    var _c = api_1.useAddonState(constants_1.ADDON_GLOBAL_DISABLE_STATE, false), setgloballyDisabled = _c[1];
    var emit = api_1.useChannel({
        storyChanged: function () {
            setIsVisible(false);
        },
        'saps/init-pseudo-states': function (addonDisabled) {
            setIsVisible(!addonDisabled);
            if (!addonDisabled) {
                var disableStateFromStorage = sessionStorage.getItem(constants_1.ADDON_GLOBAL_DISABLE_STATE) === 'true';
                setgloballyDisabled(disableStateFromStorage);
                setIsDisabled(disableStateFromStorage);
            }
        },
    });
    var onButtonClick = function () {
        var disableStateFromStorage = sessionStorage.getItem(constants_1.ADDON_GLOBAL_DISABLE_STATE) === 'true';
        var swap = !disableStateFromStorage;
        setgloballyDisabled(swap);
        setIsDisabled(swap);
        sessionStorage.setItem(constants_1.ADDON_GLOBAL_DISABLE_STATE, swap.toString());
        emit(events_1.SAPS_BUTTON_CLICK, swap);
    };
    return isVisible ? (react_1.default.createElement(components_1.IconButton, { active: !isDisabled, title: "Show/hide Pseudo States", onClick: onButtonClick },
        react_1.default.createElement(components_1.Icons, { icon: "button" }))) : null;
};
//# sourceMappingURL=PseudoStateTool.js.map