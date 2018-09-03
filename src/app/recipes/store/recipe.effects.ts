import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {

  constructor(private actions$: Actions, private readonly http: HttpClient) {
  }

  // @Effect()
  // recipeFetch = this.actions$
  //   .ofType(RecipeActions.FETCH_RECIPES)
  //   .switchMap((action: RecipeActions.FetchRecipes) => {
  //     return this.http.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', {
  //       observe: 'body',
  //       responseType: 'json'
  //     });
  //   })
  //   .map(
  //     (recipes) => {
  //       console.log(recipes);
  //       for (let recipe of recipes) {
  //         if (!recipe['ingredients']) {
  //           recipe['ingredients'] = [];
  //         }
  //       }
  //       return {
  //         type: RecipeActions.SET_RECIPES,
  //         payload: recipes
  //       };
  //     }
  //   );

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
}

