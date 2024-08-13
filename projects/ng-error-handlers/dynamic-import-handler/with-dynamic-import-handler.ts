import {
    ERROR_HANDLERS,
    ErrorHandlerFn,
    ErrorHandlersFeature,
    ErrorHandlersFeatureKind,
    makeErrorHandlersFeature,
} from "ng-error-handlers";
import { dynamicImportHandler } from "./dynamic-import-handler";

/**
 * Provides an error handler that handles failed dynamic imports such as lazy components.
 * @param callback A callback that will be executed when a dynamic import fails. If not provided
 * then the page will be reloaded.
 * @example
 * provideErrorHandlers(
 *      withDynamicImportHandler(), // with default behaviour (page reload)
 *      withDynamicImportHandler(failedImport => alert(failedImport)), // with custom behaviour
 */
export function withDynamicImportHandler(
    callback?: ErrorHandlerFn,
): ErrorHandlersFeature<ErrorHandlersFeatureKind.FuncHandlers> {
    return makeErrorHandlersFeature(ErrorHandlersFeatureKind.FuncHandlers, [
        {
            provide: ERROR_HANDLERS,
            useFactory: () => dynamicImportHandler(callback),
            multi: true,
        },
    ]);
}
