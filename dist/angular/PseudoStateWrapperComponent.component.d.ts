import { NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PseudoState, PseudoStatesParameters, Selector } from '../share/types';
export declare class PseudoStateWrapperComponent implements OnInit, OnDestroy {
    private ngZone;
    private channel;
    get parameters(): string;
    set parameters(value: string);
    private _parameters;
    get storyComponent(): string;
    set storyComponent(value: string);
    private _storyComponent;
    isDisabled: boolean;
    constructor(ngZone: NgZone);
    _onDisabledStateChangedHandler(value: boolean): void;
    boundButtonClickHandler: (value: boolean) => void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    pseudoStates: Array<PseudoState>;
    attributeStates: Array<PseudoState>;
    storyParams: PseudoStatesParameters;
    selector: Selector | null;
    componentSelector: string;
    storyTempl: TemplateRef<any>;
}
