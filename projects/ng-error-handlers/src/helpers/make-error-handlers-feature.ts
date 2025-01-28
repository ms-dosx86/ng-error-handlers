import { EnvironmentProviders, Provider } from "@angular/core";
import { ErrorHandlersFeatureKind } from "../models/error-handlers-feature-kind";
import { ErrorHandlersFeature } from "../models/error-handlers-feature";

export function makeErrorHandlersFeature<
    TKind extends ErrorHandlersFeatureKind,
>(
    kind: TKind,
    providers: (Provider | EnvironmentProviders)[],
): ErrorHandlersFeature<TKind> {
    return {
        kind,
        providers,
    };
}
