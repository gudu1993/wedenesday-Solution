import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    // items: Array<Item>;
    selectedItem: ReplaySubject<Item>;
    checkedItems$:  ReplaySubject<Array<number>>;

    itemUrl = 'api/items';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    /* Item1: Item = {
        id: 1,
        name: 'Errands for home',
        tasks: [ { id: 1, name: 'Mow the Garden'}, { id: 2, name: 'Buy Milk'} ]
    }
    Item2: Item = {
        id: 2,
        name: 'Tasks to complete for the office',
        tasks: []
    }
    Item3: Item = {
        id: 3,
        name: 'Miscellaneous tasks',
        tasks: []
    } */

    constructor(private http: HttpClient) {
        this.selectedItem = new ReplaySubject<Item>(1);
        this.checkedItems$ = new ReplaySubject<Array<number>>(1);
        /*  this.items = new Array<Item>();
         this.items.push(this.Item1);
         this.items.push(this.Item2);
         this.items.push(this.Item3); */
    }

    getItemById(itemId: number): Observable<Item> {
        // return of(this.items.filter(item => item.id === itemId)[0]);
        const url = `${this.itemUrl}/${itemId}`;
        return this.http.get<Item>(url)
    }

    getItemList(): Observable<Item[]> {
        // return of(this.items);
        return this.http.get<Item[]>(this.itemUrl)
    }

    addItem(item: Item): Observable<Item> {
        /* this.items.push(item);
        return of(item); */
        return this.http.post<Item>(this.itemUrl, item, this.httpOptions)
    }

    removeItem(item: Item): Observable<Item> {
        /*  const delItemIndex = this.items.findIndex(item=> item.name == item.name);
         this.items.splice(delItemIndex, 1);
         return of(true); */
        const id = typeof item === 'number' ? item : item.id;
        const url = `${this.itemUrl}/${id}`;
        return this.http.delete<Item>(url, this.httpOptions)
    }

    updateItem(item: Item): Observable<Item> {
        return this.http.put<Item>(this.itemUrl, item, this.httpOptions)
    }
}