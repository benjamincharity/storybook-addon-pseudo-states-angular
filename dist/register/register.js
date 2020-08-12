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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var addons_1 = __importStar(require("@storybook/addons"));
var PseudoStateTool_1 = require("../share/PseudoStateTool");
var constants_1 = require("../share/constants");
addons_1.default.register(constants_1.ADDON_ID, function (api) {
    addons_1.default.add(constants_1.TOOL_ID, {
        title: constants_1.TOOL_TITLE,
        type: addons_1.types.TOOL,
        match: function (_a) {
            var viewMode = _a.viewMode;
            return viewMode === 'story';
        },
        render: function () { return react_1.default.createElement(PseudoStateTool_1.PseudoStateTool, { api: api }); },
    });
});
//# sourceMappingURL=register.js.map