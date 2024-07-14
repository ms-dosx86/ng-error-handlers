import { DOCUMENT } from "@angular/common";
import { inject } from "@angular/core";
import { ErrorHandlerFn } from "ng-error-handlers";

/**
 * Creates an error handler that handles failed dynamic imports such as lazy components.
 * @param callback A callback that will be executed when a dynamic import fails. If not provided
 * then the page will be reloaded.
 * @example
 * provideErrorHandlers(
 *      withFuncHandlers(
 *          dynamicImportHandler(failedImport => customHandle(failedImport)),
 *          dynamicImportHandler(), // without custom behaviour
 *      )
 * )
 */
export const dynamicImportHandler: (
    callback?: ErrorHandlerFn,
) => ErrorHandlerFn = (callback?: ErrorHandlerFn) => {
    return (error: any) => {
        if (error instanceof Error && typeof error.message === "string") {
            // Just looking at the first line of the error message (ignoring the call stack part),
            // which should contain a pattern that we are looking for.
            const firstLine = error.message.split("\n")[0];
            if (firstLine?.match(/chunk-(.*?)\.js/)) {
                // Trying to load a chunk that doesn't exist anymore
                if (callback) {
                    callback(error);
                } else {
                    const doc = inject(DOCUMENT);
                    doc.location.reload();
                }
            }
        }
    };
};
