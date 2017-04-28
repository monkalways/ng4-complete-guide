import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DefaultRecipeDetailComponent } from './recipes/default-recipe-detail/default-recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { CanDeactivateGuard } from './recipes/recipe-edit/can-deactivate.guard';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
      { path: '', pathMatch: 'full', component: DefaultRecipeDetailComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard] },
  ]},
  { path: 'shoppinglist', component: ShoppingListComponent },
  { path: '', pathMatch: 'full', redirectTo: '/recipes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
