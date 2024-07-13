import {
    ErrorHandler,
    makeEnvironmentProviders,
    Provider,
} from "@angular/core";
import { ErrorHandlersManager } from "../error-handlers-manager";
import { ErrorHandlersFeature } from "../models/error-handlers-feature";
import { ErrorHandlersFeatureKind } from "../models/error-handlers-feature-kind";

export function provideErrorHandlers(
    ...features: ErrorHandlersFeature<ErrorHandlersFeatureKind>[]
) {
    const providers: Provider[] = [
        {
            provide: ErrorHandler,
            useClass: ErrorHandlersManager,
        },
    ];

    for (const feature of features) {
        providers.push(...feature.providers);
    }

    return makeEnvironmentProviders(providers);
}
