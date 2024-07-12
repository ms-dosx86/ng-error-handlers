import { InjectionToken } from "@angular/core";
import { ErrorHandlersConfig } from "../models/error-handlers-config";

export const ERROR_HANDLERS_CONFIG = new InjectionToken<ErrorHandlersConfig>(
    "Error handlers config",
    {
        factory: () => ({
            preserveDefault: true,
        }),
    },
);
