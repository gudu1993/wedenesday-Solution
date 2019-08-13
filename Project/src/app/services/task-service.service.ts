import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Item } from '../model/item';
import { Task } from '../model/task';


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    checkedTasks$:  ReplaySubject<Array<number>>;

    tasksUrl = 'api/tasks';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        this.checkedTasks$ = new ReplaySubject<Array<number>>(1);
    }

    getTaskListByItem(currItem: Item): Observable<Task[]> {
        const url = this.tasksUrl + '?parentItem=' + currItem.id
        return this.http.get<Task[]>(url)
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
    }

    removeTask(task: Task): Observable<Task> {
        const url = `${this.tasksUrl}/${task.id}`;
        return this.http.delete<Task>(url, this.httpOptions)
    }

    updateItem(task: Task): Observable<Task> {
        return of(null);
    }
}



