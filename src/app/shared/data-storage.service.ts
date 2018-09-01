import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private readonly http: HttpClient,
              private readonly recipeService: RecipeService,
              private readonly authService: AuthService) {
  }

  storeRecipes() {
    // return this.http.put('https://ng-recipe-book-19bf9.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token),
    //     headers: new HttpHeaders()
    //   });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-19bf9.firebaseio.com/recipes.json',
      // this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)});
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.http.request(req);
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://ng-recipe-book-19bf9.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
          console.log(recipes);
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
