import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators/map';
import {AuthService} from '../auth/auth.service';
import {interval} from 'rxjs';

@Injectable()
export class DataStorageService {
  constructor(private readonly http: Http,
              private readonly recipeService: RecipeService,
              private readonly authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-19bf9.firebaseio.com/recipes.json?auth='
      + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    let token = '';
    token = this.authService.getToken();
    this.http.get('https://ng-recipe-book-19bf9.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
