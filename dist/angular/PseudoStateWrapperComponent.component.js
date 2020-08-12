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
exports.PseudoStateWrapperComponent = void 0;
var core_1 = require("@angular/core");
var addons_1 = require("@storybook/addons");
var constants_1 = require("../share/constants");
var PseudoStateWrapperComponent = (function () {
    function PseudoStateWrapperComponent(ngZone) {
        this.ngZone = ngZone;
        this.channel = addons_1.addons.getChannel();
        this.isDisabled = sessionStorage.getItem(constants_1.ADDON_GLOBAL_DISABLE_STATE) === 'true';
        this.boundButtonClickHandler = this._onDisabledStateChangedHandler.bind(this);
        this.pseudoStates = [];
        this.attributeStates = [];
    }
    Object.defineProperty(PseudoStateWrapperComponent.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        set: function (value) {
            var _a, _b, _c;
            this._parameters = value;
            if (value) {
                this.storyParams = JSON.parse(unescape(value));
                this.pseudoStates = (_a = this.storyParams) === null || _a === void 0 ? void 0 : _a.pseudos;
                this.attributeStates = (_b = this.storyParams) === null || _b === void 0 ? void 0 : _b.attributes;
                this.selector = ((_c = this.storyParams) === null || _c === void 0 ? void 0 : _c.selector) || null;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PseudoStateWrapperComponent.prototype, "storyComponent", {
        get: function () {
            return this._storyComponent;
        },
        set: function (value) {
            this._storyComponent = value;
            if (value) {
                var tmpStoryComponent = JSON.parse(unescape(value));
                this.componentSelector = tmpStoryComponent === null || tmpStoryComponent === void 0 ? void 0 : tmpStoryComponent.selector;
            }
        },
        enumerable: false,
        configurable: true
    });
    PseudoStateWrapperComponent.prototype._onDisabledStateChangedHandler = function (value) {
        var _this = this;
        this.ngZone.run(function () {
            _this.isDisabled = value;
        });
    };
    PseudoStateWrapperComponent.prototype.ngOnInit = function () {
        this.channel.on('saps/toolbutton-click', this.boundButtonClickHandler);
    };
    PseudoStateWrapperComponent.prototype.ngOnDestroy = function () {
        this.channel.removeListener('saps/toolbutton-click', this.boundButtonClickHandler);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PseudoStateWrapperComponent.prototype, "parameters", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PseudoStateWrapperComponent.prototype, "storyComponent", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PseudoStateWrapperComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.ContentChild('storyTmpl', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], PseudoStateWrapperComponent.prototype, "storyTempl", void 0);
    PseudoStateWrapperComponent = __decorate([
        core_1.Component({
            selector: 'pseudo-state-wrapper',
            template: "\n    <div class=\"pseudo-state-wrapper\">\n      <pseudoe-state-wrapper-container\n        [template]=\"storyTempl\"\n        [parameters]=\"storyParams\"\n        [addonDisabled]=\"isDisabled\"\n        [pseudoState]=\"'Normal'\"\n      >\n      </pseudoe-state-wrapper-container>\n      <ng-container *ngIf=\"!isDisabled\">\n        <ng-container *ngFor=\"let state of pseudoStates\">\n          <pseudoe-state-wrapper-container\n            [template]=\"storyTempl\"\n            [selector]=\"selector\"\n            [componentSelector]=\"componentSelector\"\n            [parameters]=\"storyParams\"\n            [pseudoState]=\"state\"\n          >\n          </pseudoe-state-wrapper-container>\n        </ng-container>\n        <ng-container *ngFor=\"let attrState of attributeStates\">\n          <pseudoe-state-wrapper-container\n            [template]=\"storyTempl\"\n            [selector]=\"selector\"\n            [componentSelector]=\"componentSelector\"\n            [parameters]=\"storyParams\"\n            [isAttribute]=\"true\"\n            [pseudoState]=\"attrState\"\n          >\n          </pseudoe-state-wrapper-container>\n        </ng-container>\n      </ng-container>\n    </div>\n  ",
            styles: [],
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], PseudoStateWrapperComponent);
    return PseudoStateWrapperComponent;
}());
exports.PseudoStateWrapperComponent = PseudoStateWrapperComponent;
//# sourceMappingURL=PseudoStateWrapperComponent.component.js.map