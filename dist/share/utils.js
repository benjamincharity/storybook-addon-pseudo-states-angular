"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMixedPseudoStates = exports.sanitizePseudoName = void 0;
exports.sanitizePseudoName = function (pseudoStateName) {
    return pseudoStateName.replace(/\s/g, '').replace(/\W/g, '').replace('&', '-');
};
exports.getMixedPseudoStates = function (pseudoState) {
    return pseudoState.split('&').map(function (item) { return item.replace(/\W/g, '').trim(); });
};
//# sourceMappingURL=utils.js.map