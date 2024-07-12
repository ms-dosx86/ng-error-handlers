import { ERROR_HANDLERS } from "../constants/error-handlers";
import { ErrorHandlersFeature } from "../models/error-handlers-feature";
import { makeErrorHandlersFeature } from "./make-error-handlers-feature";
import { ErrorHandlersFeatureKind } from "../models/error-handlers-feature-kind";
import { ErrorHandlerFn } from "../models/error-handler-fn";

export function withFuncHandlers(
    ...handlers: ErrorHandlerFn[]
): ErrorHandlersFeature<ErrorHandlersFeatureKind.FuncHandlers> {
    return makeErrorHandlersFeature(
        ErrorHandlersFeatureKind.FuncHandlers,
        handlers.map((handler) => ({
            provide: ERROR_HANDLERS,
            useValue: handler,
            multi: true,
        })),
    );
}
