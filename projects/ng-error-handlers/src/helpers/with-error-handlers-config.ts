import { Provider } from "@angular/core";
import { ErrorHandlersConfig } from "../models/error-handlers-config";
import { ERROR_HANDLERS_CONFIG } from "../constants/error-handlers-config";
import { ErrorHandlersFeature } from "../models/error-handlers-feature";
import { ErrorHandlersFeatureKind } from "../models/error-handlers-feature-kind";
import { makeErrorHandlersFeature } from "./make-error-handlers-feature";

export function withErrorHandlersConfig(
    config: ErrorHandlersConfig,
): ErrorHandlersFeature<ErrorHandlersFeatureKind.Config> {
    return makeErrorHandlersFeature(ErrorHandlersFeatureKind.Config, [
        {
            provide: ERROR_HANDLERS_CONFIG,
            useValue: config,
        },
    ]);
}
