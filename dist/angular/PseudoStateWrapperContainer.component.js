"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseudoStateWrapperContainer = void 0;
var core_1 = require("@angular/core");
var addons_1 = require("@storybook/addons");
var core_events_1 = require("@storybook/core-events");
var utils_1 = require("../share/utils");
var PseudoStateWrapperContainer = (function () {
    function PseudoStateWrapperContainer(renderer, _cdRef) {
        this.renderer = renderer;
        this._cdRef = _cdRef;
        this.channel = addons_1.addons.getChannel();
        this.isAttribute = false;
        this.addonDisabled = false;
        this.forceReRenderListener = this.forceReRenderHandler.bind(this);
    }
    PseudoStateWrapperContainer.prototype.ngAfterViewInit = function () {
        var _a, _b, _c;
        this.component = (_b = (_a = this.template) === null || _a === void 0 ? void 0 : _a._projectedViews[this.template._projectedViews.length - 1]) === null || _b === void 0 ? void 0 : _b.nodes.filter(function (item) { return item === null || item === void 0 ? void 0 : item.instance; });
        if (this.component.length >= 1) {
            this.component = (_c = this.component[0]) === null || _c === void 0 ? void 0 : _c.instance;
        }
        else {
            this.component = null;
        }
        this.applyStates();
        this.channel.addListener(core_events_1.FORCE_RE_RENDER, this.forceReRenderListener);
    };
    PseudoStateWrapperContainer.prototype.forceReRenderHandler = function () {
        this.applyStates();
    };
    PseudoStateWrapperContainer.prototype.ngOnDestroy = function () {
        this.channel.removeListener(core_events_1.FORCE_RE_RENDER, this.forceReRenderListener);
    };
    PseudoStateWrapperContainer.prototype.applyStates = function () {
        if (!this.selector) {
            this._modifyStateClass(null, this.component);
        }
        else if (typeof this.selector === 'string') {
            this._modifyStateClass(this.selector, this.component);
        }
        else if (Array.isArray(this.selector)) {
            for (var _i = 0, _a = this.selector; _i < _a.length; _i++) {
                var selectorName = _a[_i];
                this._modifyStateClass(selectorName, this.component);
            }
        }
    };
    PseudoStateWrapperContainer.prototype._modifyStateClass = function (selector, component) {
        var _a;
        if (!selector && !this.componentSelector) {
            return;
        }
        var hostElement = null;
        if (selector) {
            hostElement = this.story.nativeElement.querySelector(selector);
        }
        else {
            hostElement = this.story.nativeElement.querySelector(this.componentSelector);
        }
        if (this.isAttribute) {
            component[this.pseudoState] = true;
            this._cdRef.detectChanges();
            this.renderer.setAttribute(hostElement, this.pseudoState, 'true');
            if (selector && this.componentSelector) {
                this.renderer.setAttribute(this.story.nativeElement.querySelector(this.componentSelector), this.pseudoState, 'true');
            }
        }
        else {
            var subPseudoStates = utils_1.getMixedPseudoStates(this.pseudoState);
            for (var _i = 0, subPseudoStates_1 = subPseudoStates; _i < subPseudoStates_1.length; _i++) {
                var s = subPseudoStates_1[_i];
                this.renderer.addClass(hostElement, "" + ((_a = this.parameters) === null || _a === void 0 ? void 0 : _a.prefix) + s);
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], PseudoStateWrapperContainer.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PseudoStateWrapperContainer.prototype, "pseudoState", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PseudoStateWrapperContainer.prototype, "parameters", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PseudoStateWrapperContainer.prototype, "selector", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PseudoStateWrapperContainer.prototype, "componentSelector", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PseudoStateWrapperContainer.prototype, "isAttribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PseudoStateWrapperContainer.prototype, "addonDisabled", void 0);
    __decorate([
        core_1.ViewChild('origStoryWrapper', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], PseudoStateWrapperContainer.prototype, "story", void 0);
    PseudoStateWrapperContainer = __decorate([
        core_1.Component({
            selector: 'pseudoe-state-wrapper-container',
            template: "\n    <div class=\"container\">\n      <div class=\"header\" *ngIf=\"!addonDisabled\">{{ pseudoState }}:</div>\n      <div\n        class=\"story\"\n        [class.addonDisabled]=\"addonDisabled\"\n        #origStoryWrapper\n      >\n        <ng-container [ngTemplateOutlet]=\"template\"></ng-container>\n      </div>\n    </div>\n  ",
            styles: [
                "\n      :host {\n        display: flex;\n      }\n\n      .container {\n        flex: 1 1 100%;\n      }\n\n      .header {\n        margin-bottom: 5px;\n      }\n\n      .header::first-letter {\n        text-transform: uppercase;\n      }\n\n      .story:not(.addonDisabled) {\n        padding: 0 0 10px 0;\n      }\n    ",
            ],
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, core_1.ChangeDetectorRef])
    ], PseudoStateWrapperContainer);
    return PseudoStateWrapperContainer;
}());
exports.PseudoStateWrapperContainer = PseudoStateWrapperContainer;
//# sourceMappingURL=PseudoStateWrapperContainer.component.js.map