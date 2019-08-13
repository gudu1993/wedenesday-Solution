import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item-service.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

 

  checkedItems: Array<number>;
  items: Array<Item>;
  newItem: Item;
  percentageVal: number;
  width: any;
  
  constructor(private itemService: ItemService) { 
    this.newItem = new Item();
    this.checkedItems = new Array<number>();
  }

  ngOnInit() {
    this.width=0;
    this.itemService.getItemList().subscribe(list => {
      this.items = list;
      this.itemService.checkedItems$.subscribe( checkedList => {
        this.checkedItems = checkedList;
        this.calcPercentage();
      });
    });
    

  }

  isItemChecked(itemId: number) {
    return this.checkedItems.indexOf(itemId) >= 0;
  }

  checkItem(completedItem: Item, event: Event) {
    if (event.target['checked']) {
      if (this.checkedItems.indexOf(completedItem.id) === -1) {
        this.checkedItems.push(completedItem.id);
      }
    }
    else {
      if (this.checkedItems.indexOf(completedItem.id) >= 0) {
        this.checkedItems.splice(this.checkedItems.indexOf(completedItem.id), 1);
      }
    }
    this.calcPercentage();
    this.itemService.checkedItems$.next(this.checkedItems);
  }

  calcPercentage() {
    var a = Math.round(this.checkedItems.length*100/this.items.length);
    this.width=a;
  }

  addTodoItem(newItem: Item) {
    if(!this.isItemExist(newItem)){
      this.itemService.addItem(newItem).subscribe( resp => {
        console.log('Item Added Successfully');
        this.items.push(resp);
        this.newItem = new Item();
        this.calcPercentage();
      });
     
    }
  }

  isItemExist(newItem: Item): boolean {
   return this.items.filter(item => item.name === newItem.name).length > 0;
  }

  deleteItem(deleteItem: Item) {
    if(this.isItemExist(deleteItem)) {
     var text = prompt('R u sure to delete this item');
     if(text.toLowerCase()==='yes'){
    if(this.isItemExist(deleteItem)) {
      this.itemService.removeItem(deleteItem).subscribe( resp => {
        const delItemIndex = this.items.findIndex(item => item.id == deleteItem.id);
        this.items.splice(delItemIndex, 1);
        const deleteCheckedIndex = this.checkedItems.indexOf(deleteItem.id);
        if(deleteCheckedIndex >= 0) {
        this.checkedItems.splice(deleteCheckedIndex, 1);
        }
        this.calcPercentage();
        alert('Item' + deleteItem.name + 'deleted successfully');
      })
     }
      
    }
  }
}

}
