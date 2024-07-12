import {
    ErrorHandler,
    inject,
    Injectable,
    Injector,
    runInInjectionContext,
} from "@angular/core";
import { ERROR_HANDLERS } from "./constants/error-handlers";
import { ERROR_HANDLERS_CONFIG } from "./constants/error-handlers-config";

@Injectable()
export class ErrorHandlersManager implements ErrorHandler {
    private readonly handlers = inject(ERROR_HANDLERS);
    private readonly injector = inject(Injector);
    private readonly config = inject(ERROR_HANDLERS_CONFIG);

    constructor() {
        if (this.config.preserveDefault) {
            this.handlers.push(new ErrorHandler());
        }
    }

    handleError(error: any): void {
        runInInjectionContext(this.injector, () => {
            for (const handler of this.handlers) {
                if (typeof handler === "function") {
                    handler(error);
                } else {
                    handler.handleError(error);
                }
            }
        });
    }
}
