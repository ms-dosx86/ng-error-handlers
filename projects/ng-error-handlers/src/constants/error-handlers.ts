import { ErrorHandler, InjectionToken } from "@angular/core";
import { ErrorHandlerFn } from "../models/error-handler-fn";

export const ERROR_HANDLERS = new InjectionToken<
    Array<ErrorHandler | ErrorHandlerFn>
>("Error handlers", {
    factory: () => [],
});
