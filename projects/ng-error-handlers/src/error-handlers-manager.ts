import {
    ErrorHandler,
    inject,
    Injectable,
    Injector,
    runInInjectionContext,
} from "@angular/core";
import { ERROR_HANDLERS } from "./constants/error-handlers";

@Injectable()
export class ErrorHandlersManager implements ErrorHandler {
    private readonly handlers = inject(ERROR_HANDLERS);
    private readonly injector = inject(Injector);

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
