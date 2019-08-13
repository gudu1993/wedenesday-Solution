import { List } from './../model/list';
import { ListService } from './../services/list-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  listItem: List;
  selectedListItem: List;
  lists: Array<List>;
  date: Date;
  constructor(private listService: ListService) {
    this.listItem = new List();
  }

  ngOnInit() {
    this.listService.getList().subscribe(list => this.lists = list);
  }
  addListItem(listItem: List) {
    if (listItem.name) {
      listItem.date = new Date();
      this.listService.addList(listItem).subscribe(resp => {
        this.listItem = new List();
      });
    } else {
      alert('Please add Texts');
    }
  }
  editList(list: List) {
    if (this.listItem && this.listItem.name) {
      this.addListItem(this.listItem);
    }
    this.listService.deleteList(list).subscribe(resp => {
      this.listItem = resp;
    });
    this.selectedListItem = list;
  }
  deleteListItem() {
    this.listItem.name = null;
  }

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}
