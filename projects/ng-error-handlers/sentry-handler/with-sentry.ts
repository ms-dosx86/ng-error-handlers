import {
    ERROR_HANDLERS,
    ErrorHandlersFeature,
    ErrorHandlersFeatureKind,
    makeErrorHandlersFeature,
} from "ng-error-handlers";
import {
    SentryErrorHandler,
    BrowserOptions,
    init,
    ErrorHandlerOptions,
} from "@sentry/angular";
import { APP_INITIALIZER } from "@angular/core";

/**
 * Allows to provide `Sentry` as a `class` based error handler.
 * @param options Options to init `Sentry` (seek `Sentry.BrowserOptions` for more details).
 * @example
 * provideErrorHandlers(
 *      withSentry({
 *          // Sentry options here
 *      }),
 * )
 */
export function withSentry(
    options: BrowserOptions,
    errorHandlerOptions?: ErrorHandlerOptions,
): ErrorHandlersFeature<ErrorHandlersFeatureKind.ClassHandlers> {
    return makeErrorHandlersFeature(ErrorHandlersFeatureKind.ClassHandlers, [
        {
            provide: ERROR_HANDLERS,
            useClass: SentryErrorHandler,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {
                init(options);
            },
            multi: true,
        },
        {
            provide: "errorHandlerOptions",
            useValue: errorHandlerOptions,
        },
    ]);
}
