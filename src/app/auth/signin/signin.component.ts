import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private readonly store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.store.dispatch(new AuthActions.TrySignin({username: form.value.email, password: form.value.password}));
  }
}
