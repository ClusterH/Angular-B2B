import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.css']
})
export class ArtboardComponent implements OnInit {

  collapse:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  expand() {
    if(this.collapse) {
      this.collapse = false;
    } else {
      this.collapse = true;
    }
  }

}
