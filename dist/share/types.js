"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseudoStatesDefaultPrefixAlternative = exports.PseudoStatesDefaultPrefix = exports.AttributesStatesInputDefault = exports.AttributesStatesDefault = exports.PseudoStatesDefault = exports.READONLY = exports.DISABLED = exports.AttributeStatesEnum = exports.VISITED = exports.FOCUS_WITHIN = exports.FOCUS = exports.ACTIVE = exports.HOVER = exports.PseudoStateEnum = void 0;
var PseudoStateEnum;
(function (PseudoStateEnum) {
    PseudoStateEnum["HOVER"] = "hover";
    PseudoStateEnum["ACTIVE"] = "active";
    PseudoStateEnum["FOCUS"] = "focus";
    PseudoStateEnum["FOCUS_WITHIN"] = "focus-within";
    PseudoStateEnum["VISITED"] = "visited";
})(PseudoStateEnum = exports.PseudoStateEnum || (exports.PseudoStateEnum = {}));
exports.HOVER = PseudoStateEnum.HOVER, exports.ACTIVE = PseudoStateEnum.ACTIVE, exports.FOCUS = PseudoStateEnum.FOCUS, exports.FOCUS_WITHIN = PseudoStateEnum.FOCUS_WITHIN, exports.VISITED = PseudoStateEnum.VISITED;
var AttributeStatesEnum;
(function (AttributeStatesEnum) {
    AttributeStatesEnum["DISABLED"] = "disabled";
    AttributeStatesEnum["READONLY"] = "readonly";
})(AttributeStatesEnum = exports.AttributeStatesEnum || (exports.AttributeStatesEnum = {}));
exports.DISABLED = AttributeStatesEnum.DISABLED, exports.READONLY = AttributeStatesEnum.READONLY;
exports.PseudoStatesDefault = [exports.FOCUS, exports.HOVER, exports.ACTIVE];
exports.AttributesStatesDefault = [exports.DISABLED];
exports.AttributesStatesInputDefault = [
    exports.DISABLED,
    exports.READONLY,
];
exports.PseudoStatesDefaultPrefix = ':';
exports.PseudoStatesDefaultPrefixAlternative = 'pseudo-states--';
//# sourceMappingURL=types.js.map