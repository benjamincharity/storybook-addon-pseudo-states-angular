import { RuleSetCondition, RuleSetRule } from 'webpack';
import { PostCssLoaderPseudoClassesPluginOptions } from 'postcss-pseudo-classes';
export interface CssLoaderOptions {
    url?: boolean | (() => boolean);
    import?: boolean | (() => boolean);
    modules?: boolean | string | {
        localIdentName?: string;
        getLocalIdent?: () => string;
    };
    sourceMap?: boolean;
    importLoaders?: number;
    localsConvention?: string;
    onlyLocals?: boolean;
    esModule?: boolean;
}
export interface PseudoStatesPresetOptions {
    postCssLoaderPseudoClassesPluginOptions?: PostCssLoaderPseudoClassesPluginOptions;
    rules?: Array<RuleSetCondition>;
    cssLoaderOptions?: CssLoaderOptions;
}
export declare const postCSSOptionsDefault: PostCssLoaderPseudoClassesPluginOptions;
export declare const cssLoaderOptionsDefault: CssLoaderOptions;
export declare const filterRules: (rules: Array<RuleSetRule>, conditions: Array<RuleSetCondition>) => Array<RuleSetRule>;
export declare const addPostCSSLoaderToRules: (rules: Array<RuleSetRule>, postCssLoaderOptions: PostCssLoaderPseudoClassesPluginOptions) => void;
export declare const modifyCssLoaderModuleOption: (rules: Array<RuleSetRule>, cssLoaderOptions: CssLoaderOptions) => void;
