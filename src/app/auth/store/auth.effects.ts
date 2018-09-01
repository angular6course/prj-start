import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {from} from 'rxjs';

@Injectable()
export class AuthEffects {

  // @Effect({dispatch: false})  ohne dispatch: false gibt es einen neuen effect zurück,
  // dann darf aber auch keine neue action am schluss (hier mergemap zurückgegeben werden)
  @Effect()
  authSignup = this.actions$.ofType(AuthActions.TRY_SIGNUP)
    .pipe(map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        return [{
          type: AuthActions.SIGNUP
        },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  constructor(private actions$: Actions) {
  }
}
