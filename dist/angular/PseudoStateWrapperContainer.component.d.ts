import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { PseudoState, PseudoStatesParameters } from '../share/types';
export declare class PseudoStateWrapperContainer implements AfterViewInit, OnDestroy {
    private renderer;
    private _cdRef;
    private channel;
    private component;
    template: TemplateRef<any>;
    pseudoState: PseudoState;
    parameters: PseudoStatesParameters;
    selector: string | Array<string>;
    componentSelector: string;
    isAttribute: boolean;
    addonDisabled: boolean;
    story: ElementRef;
    constructor(renderer: Renderer2, _cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    forceReRenderHandler(): void;
    forceReRenderListener: () => void;
    ngOnDestroy(): void;
    applyStates(): void;
    private _modifyStateClass;
}
