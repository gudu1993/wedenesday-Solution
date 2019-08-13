import { Component, OnInit, TestabilityRegistry } from '@angular/core';

@Component({
  selector: 'app-side-bar-bind',
  templateUrl: './side-bar-bind.component.html',
  styleUrls: ['./side-bar-bind.component.css']
})
export class SideBarBindComponent implements OnInit {
 
  texts = ['ACLTC General','Blog Posts'];
  noteText: string;
  textItem1: string;
  constructor() { }

  saveText(noteText: string) {
    this.texts.unshift(noteText);
    noteText = '';
    this.noteText = noteText;

  }
  deleteText(textItem: string){
    alert(textItem);
  }
  ngOnInit() {
  }

}
