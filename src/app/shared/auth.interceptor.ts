import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted ', req);
    // const copiedRequest = req.clone({headers: req.headers.append('', '')});

    return this.store.select('auth')
      .pipe(switchMap((authState: fromAuth.State) => {
        const copiedRequest = req.clone({params: req.params.append('auth', authState.token)});
        return next.handle(copiedRequest);
      }));
  }
}
