import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from '../model/item';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  items: Array<Item>;
  tasks: Array<Task>;

  task1: Task = {
    id: 1,
    name: 'Mow the Garden',
    parentItem: 1
  }

  task2: Task = {
    id: 2,
    name: 'Buy Milk',
    parentItem: 1
  }

  Item1: Item = {
    id: 1,
    name: 'Errands for home'
  }

  Item2: Item = {
    id: 2,
    name: 'Tasks to complete for the office'
  }
  Item3: Item = {
    id: 3,
    name: 'Miscellaneous tasks'
  }

  createDb() {
    this.items = new Array<Item>();
    this.items.push(this.Item1);
    this.items.push(this.Item2);
    this.items.push(this.Item3);

    this.tasks = new Array<Task>();
    this.tasks.push(this.task1);
    this.tasks.push(this.task2);

    return {
      items: this.items,
      tasks: this.tasks
    };
  }

 /*  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 11;
  } */
}
