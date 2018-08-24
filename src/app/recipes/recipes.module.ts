import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
      RecipesComponent,
      RecipeStartComponent,
      RecipeListComponent,
      RecipeDetailComponent,
      RecipeEditComponent,
      RecipeItemComponent,
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule
    ]
  },
)
export class RecipesModule {

}
