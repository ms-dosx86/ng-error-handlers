# ng-error-handlers

Angular allows developers to have only one `ErrorHandler` at a time which sometimes may be suboptimal if you already have
an error handler like `Sentry` and want to add additional error handling. In such cases you would have to extend the existing
`ErrorHandler` and override `handleError`, add some error handling and call `super.handleError(error)`. This might be quite annoying
especially wheh you want to use **multiple** error handlers alongside with existing ones. This library allows you to provide multiple
error handlers (both `class` and `function` based) which will be executed one by one when an error occures.

## Installation

```
npm i ng-error-handlers
```

## Angular version compatibility

Compatible with v17+

## Basic setup

```ts
import {provideErrorHandlers} from 'ng-error-handlers';

// Standalone projects
bootstrapApplication(AppComponent, {
    providers: [
        provideErrorHandlers(),
    ]
})

// Module based projects
@NgModule({
    providers: [
        provideErrorHandlers(),
    ]
})
export class AppModule {}
```

By default `provideErrorHandlers` doesn't provide any error handler. So if you want to have at least basic `ErrorHandler` you can provide it
via `withClassHandlers`.

## Class based handlers

A class must implement `ErrorHandler` interface from `@angular/core`.

```ts
import {provideErrorHandlers, withClassHandlers} from 'ng-error-handlers';
import {ErrorHandler} from '@angular/core';

class MyCustomHandler implements ErrorHandler {
    handleError(error: any) {
        // do some stuff
    }
}

// Standalone projects
bootstrapApplication(AppComponent, {
    providers: [
        provideErrorHandlers(
            withClassHandlers(ErrorHandler, MyCustomHandler)
        ),
    ]
})

// Module based projects
@NgModule({
    providers: [
        provideErrorHandlers(
            withClassHandlers(ErrorHandler, MyCustomHandler)
        ),
    ]
})
export class AppModule {}
```

## Function based handlers

It is possible to just use a function to handle an error. A function must satisfy `ErrorHandlerFn` type from `ng-error-handlers`.

```ts
import {provideErrorHandlers, withFuncHandlers, ErrorHandlerFn} from 'ng-error-handlers';

const customHandler: ErrorHandlerFn = (error: any) => {
    // do some stuff
}

// Standalone projects
bootstrapApplication(AppComponent, {
    providers: [
        provideErrorHandlers(
            withFuncHandlers(customHandler)
        ),
    ]
})

// Module based projects
@NgModule({
    providers: [
        provideErrorHandlers(
            withFuncHandlers(customHandler)
        ),
    ]
})
export class AppModule {}
```

## Usage with both class and function based handlers

```ts
import {provideErrorHandlers, withFuncHandlers, withClassHandlers, ErrorHandlerFn} from 'ng-error-handlers';
import {ErrorHandler} from '@angular/core';

class MyCustomHandler implements ErrorHandler {
    handleError(error: any) {
        // do some stuff
    }
}

const customHandler: ErrorHandlerFn = (error: any) => {
    // do some stuff
}

// Standalone projects
bootstrapApplication(AppComponent, {
    providers: [
        provideErrorHandlers(
            withClassHandlers(ErrorHandler, MyCustomHandler),
            withFuncHandlers(customHandler)
        ),
    ]
})

// Module based projects
@NgModule({
    providers: [
        provideErrorHandlers(
            withClassHandlers(ErrorHandler, MyCustomHandler),
            withFuncHandlers(customHandler)
        ),
    ]
})
export class AppModule {}
```

## Injection context

`provideErrorHandlers` returns `EnvironmentProviders` and thus must be provided either on application level or route level with the appropriate `EnvironmentInjector`. Hence it is possible to use `DI` in both `class` and `function` based error handlers.

```ts
import {ErrorHandler} from '@angular/core';
import {ErrorHandlerFn} from 'ng-error-handlers';

class MyCustomHandler implements ErrorHandler {
    private readonly analyticsService = inject(AnalyticsService);

    handleError(error: any) {
        this.analyticsService.log(error);
    }
}

const myCustomHandler: ErrorHandlerFn = (error: any) => {
    const analyticsService = inject(AnalyticsService);
    analyticsService.log(error);
}
```

## Catching failed dynamic imports

Sometimes a new release gets deployed but users are still using an old build with
old chunk hashes and haven't fetched the new build. In such situations if a user tries
to open a lazy route, the attempt will fail with such error

```
TypeError: Failed to fetch dynamically imported module: https://example.com/chunk-4XF37HCG.js
```

There is a handy `withDynamicImportHandler` function to handle such sitatuions

```ts
import {provideErrorHandlers, withFuncHandlers} from 'ng-error-handlers';
import {withDynamicImportHandler} from 'ng-error-handlers/dynamic-import-handler';

provideErrorHandlers(
    withDynamicImportHandler(),
    // custom behaviour
    withDynamicImportHandler(failedImport => alert(failedImport)),
)
```

It takes one argument `callback` that will be executed once a dynamic import error occurs.
If `callback` is not provided then the default behavior will be the current page reloading.

## Sentry integration

In a nutshell Sentry just replaces `ErrorHandler` with its own class `SentryErrorHandler` which can be done just like this

```ts
import {provideErrorHandlers, withClassHandlers} from 'ng-error-handlers';
import {SentryErrorHandler, init} from '@sentry/angular';

init({
    // Sentry options
});

provideErrorHandlers(
    withClassHandlers(SentryErrorHandler),
)
```

To make things easier there is a function `withSentry` which creates a `class` handler under the hood and calls `Sentry.init()`
via `APP_INITIALIZER`.

```ts
import {provideErrorHandlers, withClassHandlers} from 'ng-error-handlers';
import {withSentry} from 'ng-error-handlers/sentry-handler';
import {browserTracingIntegration, replayIntegration, TraceService} from '@sentry/angular';
import {Router} from '@angular/router';
import {APP_INITIALIZER} from '@angular/core';

providers: [
    provideErrorHandlers(
        withSentry({
            dsn: "https://my.dsn",
            integrations: [
                browserTracingIntegration(),
                replayIntegration(),
            ],
            // Performance Monitoring
            tracesSampleRate: 1.0, //  Capture 100% of the transactions
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: [
                "localhost",
                /^https:\/\/yourserver\.io\/api/,
            ],
            // Session Replay
            replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
            replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
        }),
    ),
    // Provide additional things like TraceService
    {
        provide: TraceService,
        deps: [Router],
    },
    {
        provide: APP_INITIALIZER,
        useFactory: () => () => {},
        deps: [TraceService],
        multi: true,
    },
]
```
