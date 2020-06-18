import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor }  from './auth-interceptor';

/** Providers dos interceptores HTTP. */
export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];