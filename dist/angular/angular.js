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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPseudo = void 0;
var addons_1 = require("@storybook/addons");
var types_1 = require("../share/types");
var events_1 = require("../share/events");
var PseudoStateWrapperComponent_component_1 = require("./PseudoStateWrapperComponent.component");
var PseudoStateWrapperContainer_component_1 = require("./PseudoStateWrapperContainer.component");
function getModuleMetadata(metadata) {
    var moduleMetadata = metadata === null || metadata === void 0 ? void 0 : metadata.moduleMetadata;
    var component = metadata === null || metadata === void 0 ? void 0 : metadata.component;
    if (component && !moduleMetadata) {
        moduleMetadata = {
            declarations: [metadata.component],
        };
    }
    else if (moduleMetadata && !moduleMetadata.declarations) {
        moduleMetadata = __assign(__assign({}, moduleMetadata), { declarations: [] });
    }
    if (component && moduleMetadata) {
        return __assign(__assign({}, moduleMetadata), { declarations: __spreadArrays(moduleMetadata.declarations, [
                PseudoStateWrapperComponent_component_1.PseudoStateWrapperComponent,
                PseudoStateWrapperContainer_component_1.PseudoStateWrapperContainer,
            ]) });
    }
    return moduleMetadata;
}
var isValidInputOrOutputOfComponent = function (storyComponent, property) {
    var componentProperty = storyComponent === null || storyComponent === void 0 ? void 0 : storyComponent.__prop__metadata__[property];
    if (!componentProperty && (storyComponent === null || storyComponent === void 0 ? void 0 : storyComponent.__proto__)) {
        return isValidInputOrOutputOfComponent(storyComponent === null || storyComponent === void 0 ? void 0 : storyComponent.__proto__, property);
    }
    var isDef = componentProperty.length > 0;
    if (isDef) {
        var p = componentProperty[0];
        var proto = p === null || p === void 0 ? void 0 : p.__proto__;
        var meta = proto === null || proto === void 0 ? void 0 : proto.ngMetadataName;
        return meta;
    }
    return undefined;
};
exports.withPseudo = addons_1.makeDecorator({
    name: 'withPseudo',
    parameterName: 'withPseudo',
    skipIfNoParametersOrOptions: false,
    allowDeprecatedUsage: false,
    wrapper: function (getStory, context, settings) {
        var _a, _b;
        var story = getStory(context);
        var channel = addons_1.addons.getChannel();
        var compInternal = (_a = story.component) === null || _a === void 0 ? void 0 : _a.__annotations__[0];
        var options = settings === null || settings === void 0 ? void 0 : settings.options;
        var parameters = (settings === null || settings === void 0 ? void 0 : settings.parameters) || {};
        var addonDisabled = ((_b = settings === null || settings === void 0 ? void 0 : settings.parameters) === null || _b === void 0 ? void 0 : _b.disabled) || false;
        channel.emit(events_1.SAPS_INIT_PSEUDO_STATES, addonDisabled);
        if (parameters === null || parameters === void 0 ? void 0 : parameters.disabled) {
            return story;
        }
        var storyParameters = null;
        parameters.pseudos =
            (parameters === null || parameters === void 0 ? void 0 : parameters.pseudos) || (options === null || options === void 0 ? void 0 : options.pseudos) || types_1.PseudoStatesDefault;
        parameters.attributes =
            (parameters === null || parameters === void 0 ? void 0 : parameters.attributes) || (options === null || options === void 0 ? void 0 : options.attributes) || types_1.AttributesStatesDefault;
        parameters.prefix =
            (parameters === null || parameters === void 0 ? void 0 : parameters.prefix) || (options === null || options === void 0 ? void 0 : options.prefix) ||
                types_1.PseudoStatesDefaultPrefixAlternative;
        storyParameters = escape(JSON.stringify(parameters));
        var storyComponent = null;
        if (story.component && compInternal) {
            storyComponent = escape(JSON.stringify(compInternal));
        }
        else {
            console.warn('Pseudo States Addon:', 'add component property to your story');
        }
        var newTemplate = story.template;
        if (!newTemplate) {
            var propertyString = '';
            for (var property in story === null || story === void 0 ? void 0 : story.props) {
                if (story === null || story === void 0 ? void 0 : story.props.hasOwnProperty(property)) {
                    if (story === null || story === void 0 ? void 0 : story.component) {
                        var ioType = isValidInputOrOutputOfComponent(story.component, property);
                        switch (ioType) {
                            case 'Input':
                                propertyString += "[" + property + "]=\"" + property + "\" ";
                                break;
                            case 'Output':
                                propertyString += "(" + property + ")=\"" + property + "($event)\" ";
                                break;
                            default:
                                console.warn('Pseudo States Addon:', 'unkown prop for @Input/@Output', property);
                                break;
                        }
                    }
                }
            }
            newTemplate = "<" + compInternal.selector + " " + propertyString + "></" + compInternal.selector + ">";
        }
        return __assign(__assign({}, story), { template: "<pseudo-state-wrapper \n                        [parameters]=\"'" + storyParameters + "'\"\n                        [storyComponent]=\"'" + storyComponent + "'\"\n                    ><ng-template #storyTmpl>      \n                        " + newTemplate + "\n                        </ng-template>\n                    </pseudo-state-wrapper>", moduleMetadata: getModuleMetadata(story), props: __assign({}, story.props) });
    },
});
//# sourceMappingURL=angular.js.map