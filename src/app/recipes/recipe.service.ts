import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'just a test description',
      'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg'),
    new Recipe('Another Test Recipe',
      'The description of the recipe',
      'https://www.sensibus.com/deli/sites/sensibus.com/files/recipes/pasta-dish-2_0.jpg')

  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
