import { WrapperSettings } from '@storybook/addons';
export declare enum PseudoStateEnum {
    HOVER = "hover",
    ACTIVE = "active",
    FOCUS = "focus",
    FOCUS_WITHIN = "focus-within",
    VISITED = "visited"
}
export declare const HOVER: PseudoStateEnum, ACTIVE: PseudoStateEnum, FOCUS: PseudoStateEnum, FOCUS_WITHIN: PseudoStateEnum, VISITED: PseudoStateEnum;
export declare enum AttributeStatesEnum {
    DISABLED = "disabled",
    READONLY = "readonly"
}
export declare const DISABLED: AttributeStatesEnum, READONLY: AttributeStatesEnum;
export declare type PseudoState = PseudoStateEnum | string;
export declare type AttributeState = AttributeStatesEnum | string;
export declare type PseudoStates = Array<PseudoState>;
export declare type AttributeStates = Array<AttributeState>;
export declare const PseudoStatesDefault: PseudoStates;
export declare const AttributesStatesDefault: AttributeStates;
export declare const AttributesStatesInputDefault: AttributeStates;
export interface WrapperPseudoStateSettings extends WrapperSettings {
    parameters: PseudoStatesParameters;
}
export declare const PseudoStatesDefaultPrefix = ":";
export declare const PseudoStatesDefaultPrefixAlternative = "pseudo-states--";
export declare type Selector = string | Array<string> | null | undefined;
export interface PseudoStatesParameters {
    disabled?: boolean;
    selector?: Selector;
    prefix?: string;
    pseudos?: PseudoStates;
    attributes?: AttributeStates;
}
