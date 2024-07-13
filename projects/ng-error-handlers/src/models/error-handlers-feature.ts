import { Provider } from "@angular/core";
import { ErrorHandlersFeatureKind } from "./error-handlers-feature-kind";

export interface ErrorHandlersFeature<TKind extends ErrorHandlersFeatureKind> {
    kind: TKind;
    providers: Provider[];
}
