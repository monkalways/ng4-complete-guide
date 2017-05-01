import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();

    this.subscription = this.recipeService.recipesChanged.subscribe(recipe => {
      this.getRecipes();
    });
  }

  private getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
