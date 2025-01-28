import {
    EnvironmentProviders,
    ErrorHandler,
    makeEnvironmentProviders,
    Provider,
} from "@angular/core";
import { ErrorHandlersManager } from "../error-handlers-manager";
import { ErrorHandlersFeature } from "../models/error-handlers-feature";
import { ErrorHandlersFeatureKind } from "../models/error-handlers-feature-kind";

/**
 * Replaces global `ErrorHandler` with a custom error handler which executes
 * other error handlers (provided via `features`) one by one.
 * @param features List of feature functions that provide custom error handlers.
 * @example
 * provideErrorHandlers(
 *      withClassHandlers(ErrorHandler),
 *      withFuncHandlers((error) => console.log(error))
 * )
 */
export function provideErrorHandlers(
    ...features: ErrorHandlersFeature<ErrorHandlersFeatureKind>[]
) {
    const providers: (EnvironmentProviders | Provider)[] = [
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
