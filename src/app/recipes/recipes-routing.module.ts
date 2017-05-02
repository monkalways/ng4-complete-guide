import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { DefaultRecipeDetailComponent } from './default-recipe-detail/default-recipe-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { CanDeactivateGuard } from './recipe-edit/can-deactivate.guard';

const recipeRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
      { path: '', pathMatch: 'full', component: DefaultRecipeDetailComponent },
  ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {}