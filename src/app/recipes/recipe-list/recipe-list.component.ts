import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'http://cdn.xl.thumbs.canstockphoto.com/canstock35842087.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply another test', 'http://cdn.xl.thumbs.canstockphoto.com/canstock9417848.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeItemClicked(selectedRecipe: Recipe) {
    this.recipeSelected.emit(selectedRecipe);
  }

}
