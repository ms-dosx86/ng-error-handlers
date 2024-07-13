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

Compatible with v17 and v18

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