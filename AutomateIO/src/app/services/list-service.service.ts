import { List } from './../model/list';
import { Injectable } from '@angular/core';
import { of , Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ListService {
    lists: Array<List>;
    list1: List = {name: 'ACLTC General' , date: new Date()};
    list2: List = {name: 'Blog Posts', date: new Date()};
    list3: List = {name: 'Blog ideas', date: new Date()};
    list4: List = {name: 'Blog ideas', date: new Date()};
    list5: List = {name: 'Blog ideas', date: new Date()};
    list6: List = {name: 'Blog ideas', date: new Date()};
    constructor() {
        this.lists = new Array<List>();
        this.lists.push(this.list1);
        this.lists.push(this.list2);
        this.lists.push(this.list3);
        this.lists.push(this.list4);
        this.lists.push(this.list5);
        this.lists.push(this.list6);
     }

    addList(list: List): Observable<List> {
        this.lists.unshift(list);
        return of (list);
    }

    getList() {
        return of(this.lists);
    }
    deleteList(list: List) {
        const delIndex = this.lists.findIndex(listItem => listItem.name === list.name);
        this.lists.splice(delIndex, 1);
        return of (list);
    }
}
