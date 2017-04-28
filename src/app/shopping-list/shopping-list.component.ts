import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: [ 'shopping-list.component.css' ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private ingredientsChangedSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        
        this.shoppingListService.ingredientsChanged.subscribe(
            ingredients => this.ingredients = ingredients
        );
    }

    ngOnDestroy() {
        if(this.ingredientsChangedSubscription)
            this.ingredientsChangedSubscription.unsubscribe();
    }

    selectIngredient(index: number) {
        this.shoppingListService.ingredientSelectedForEdit.next(index);
    }
}