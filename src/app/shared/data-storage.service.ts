import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {
  constructor(private readonly http: Http, private readonly recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-19bf9.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }
}
