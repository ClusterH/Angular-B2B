import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-starter';
  version = 'Angular version 9.1.2';  
  session:boolean = false;

  constructor() {
    //console.log("parent.....", localStorage.getItem('login'))
    this.session = (localStorage.getItem('login') == 'true')? true:false;
  }

}
