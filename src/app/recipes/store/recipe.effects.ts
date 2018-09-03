import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as fromRecipe from '../store/recipe.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {

  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
        return this.http.get<Recipe[]>('https://ng-recipe-book-19bf9.firebaseio.com/recipes.json',
          {
            observe: 'body',
            responseType: 'json'
          });
      }),
      map(
        (recipes) => {
          console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      ));

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(withLatestFrom(this.store.select('recipes')),
      switchMap(([action, newState]) => {
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-19bf9.firebaseio.com/recipes.json',
          // this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)});
          newState.recipes, {reportProgress: true});
        return this.http.request(req);
      }));

  constructor(private actions$: Actions,
              private readonly http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }
}

