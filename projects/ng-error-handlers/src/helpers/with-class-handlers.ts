import { ErrorHandler } from "@angular/core";
import { ERROR_HANDLERS } from "../constants/error-handlers";
import { ErrorHandlersFeature } from "../models/error-handlers-feature";
import { makeErrorHandlersFeature } from "./make-error-handlers-feature";
import { ErrorHandlersFeatureKind } from "../models/error-handlers-feature-kind";

/**
 * Allows to provide `class` based error handlers.
 * @param handlers A list of classes (not instances!) that implement `ErrorHandler` interface.
 */
export function withClassHandlers(
    ...handlers: (typeof ErrorHandler)[]
): ErrorHandlersFeature<ErrorHandlersFeatureKind.ClassHandlers> {
    return makeErrorHandlersFeature(
        ErrorHandlersFeatureKind.ClassHandlers,
        handlers.map((handler) => ({
            provide: ERROR_HANDLERS,
            useClass: handler,
            multi: true,
        })),
    );
}
