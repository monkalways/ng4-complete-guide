import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const headers = new Headers({
    'content-type': 'application/json'
});

@Injectable()
export class RecipeService {

  private recipesUrl: string = 'https://api.mongolab.com/api/1/databases/angular2byexample/collections/recipes?apiKey=-kKIAe6FBwUT66ynjF_eLbueDCbLJB7Z';

  recipesChanged: Subject<Recipe> = new Subject<Recipe>();

  private recipes: Recipe[];

  constructor(private shoppingListService: ShoppingListService, private http: Http) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get(this.recipesUrl)
      .map(res => { 
        let recipes = res.json();
        this.recipes = recipes;
        return recipes;
      });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number): Observable<Recipe> {
    const url = this.getRecipeUrl(id);
    return this.http.get(url)
      .map(res => res.json());
  }

  addRecipe(recipe: Recipe) {
    recipe._id = this.recipes.length + 1;
    // this.recipes.push(recipe);
    
    this.http.post(this.recipesUrl, recipe, {
      headers: headers
    }).subscribe(res => {
      this.recipesChanged.next(recipe);
    });
  }

  updateRecipe(recipe: Recipe) {
    const url = this.getRecipeUrl(recipe._id);
    const recipeToUpdate: any = recipe;
    delete recipeToUpdate._id;
    this.http.put(url, recipeToUpdate, {
      headers: headers
    }).subscribe(res => {
      this.recipesChanged.next(recipe);
    });
  }

  delete(recipe: Recipe) {
    this.http.delete(this.getRecipeUrl(recipe._id)).subscribe(res => {
      this.recipesChanged.next(recipe);
    });
  }

  getRecipeUrl(id: number): string {
    return `https://api.mongolab.com/api/1/databases/angular2byexample/collections/recipes/${id}?apiKey=-kKIAe6FBwUT66ynjF_eLbueDCbLJB7Z`;
  }
}
