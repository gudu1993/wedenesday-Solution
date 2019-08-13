import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../model/item';
import { ItemService } from '../services/item-service.service';
import { Task } from '../model/task';
import { TaskService } from '../services/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  completedTasks: Array<number>;
  width: any;
  toDoItemHome: string;
  percentageVal: number;
  selectedItem: Item;
  newTask: Task;
  itemTasks: Array<Task>;

  constructor(private router: Router, private route: ActivatedRoute, private itemService: ItemService,
    private taskService: TaskService) {
    this.completedTasks = new Array<number>();
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('itemId')) {
        this.itemService.getItemById(parseInt(paramMap.get('itemId'), 10)).subscribe(item => {
          this.selectedItem = item;
          this.taskService.getTaskListByItem(this.selectedItem).subscribe(taskList => {
            this.itemTasks = taskList;
            this.itemService.checkedItems$.subscribe( chkItemList => {
              if(chkItemList.indexOf(this.selectedItem.id) >= 0 ) {
                this.itemTasks.map( item => this.completedTasks.push(item.id));
                this.calcPercentage();
              }
            })
          })
        });
      }
    });


    this.newTask = new Task();
  }

  ngOnInit() {
    this.width = 0;
  }


  completeTask(completedTask: Task, event: Event) {
    if (event.target['checked']) {
      if (this.completedTasks.indexOf(completedTask.id) === -1) {
        this.completedTasks.push(completedTask.id);
      }
    }
    else {
      if (this.completedTasks.indexOf(completedTask.id) >= 0) {
        this.completedTasks.splice(this.completedTasks.indexOf(completedTask.id), 1);
      }
    }
    this.calcPercentage();
  }

  calcPercentage() {
    var a = Math.round(this.completedTasks.length * 100 / this.itemTasks.length);
    this.width = a;
  }
  

  isTaskCompleted(taskId: number): boolean {
    return this.completedTasks.indexOf(taskId) >= 0;
  }

  isTaskExist(newTask: Task): boolean {
    return this.itemTasks.findIndex(task => task.name == newTask.name) >= 0;
  }

  addTask() {
    if (!this.isTaskExist(this.newTask)) {
      this.newTask.parentItem = this.selectedItem.id;
      this.taskService.addTask(this.newTask).subscribe(newTask => {
        this.itemTasks.push(newTask);
        this.newTask = new Task();
        this.calcPercentage();
      });
    }
  }

  deleteTask(currTask: Task) {
    if (this.isTaskExist(currTask)) {
      var text = prompt('R u sure to delete this item');
      if (text.toLowerCase() === 'yes') {
        this.taskService.removeTask(currTask).subscribe(removedTask => {
          const deletedTaskIndex = this.itemTasks.findIndex(task => task.id === currTask.id);
          this.itemTasks.splice(deletedTaskIndex, 1);
          const deleteCompletedIndex = this.completedTasks.indexOf(currTask.id);
          if(deleteCompletedIndex >= 0) {
          this.completedTasks.splice(deleteCompletedIndex, 1);
          }
          this.calcPercentage();
          alert('Task Deleted Successfully');
        })
      }
    }
  }

  backToHome() {
    this.router.navigate(["/"]);
  }


}
