import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'just a test description',
      'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg'),
    new Recipe('Another Test Recipe',
      'The description of the recipe',
      'https://www.sensibus.com/deli/sites/sensibus.com/files/recipes/pasta-dish-2_0.jpg')

  ];

  constructor() {
  }

  ngOnInit() {
  }

}
