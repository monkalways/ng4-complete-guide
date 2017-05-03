import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  editMode: boolean = false;
  private editedItemIndex: number;
  private editedItem: Ingredient;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientSelectedForEdit.subscribe(index => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue(this.editedItem);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit() {
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.form.value);
    } else {
      this.shoppingListService.addIngredient(this.form.value);
    }
    this.reset();
  }

  delete() {
    if(this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.reset();
    }
  }

  reset() {
    this.form.reset();
    this.editMode = false;
  }
}
