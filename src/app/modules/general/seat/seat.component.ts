import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  bseats: any;//bussiness json
  eseats: any;//economy json
  blength: any; //bseats length
  selectionArr: string[] = []; //selection array 

  uniqueId:number = 0;

  //this variables will change later agin
  empty:boolean = true;
  empty1:boolean = false;

  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  constructor() { }

  ngOnInit(): void {
    fetch('../assets/json/bussiness.json').then(res => res.json())
    .then(json => {
      this.bseats = json;
      this.blength = this.bseats.length;
      console.log(this.blength);
    });
  }

  increase() {
    this.uniqueId++;
    console.log("unique..............", this.uniqueId);
  }
  // onClosePop() {
  //   this.flag = true;
  // }
  // onClosePop(id: number) {

  //   // Incorect because _results is private.
  //   /*
  //    this.trigger._results[id].togglePopover();
  //    */

  //   this.trigger.toArray()[id].togglePopover();

  // }

  closePopover() {

    // Incorect because _results is private.
    /*
     this.trigger._results[id].togglePopover();
     */
    //console.log("id..................", id)
    this.trigger.toArray().map(item => {
      item.closePopover();
    })
    //this.trigger.toArray()[id].closePopover();

  }
  //will update this method based on index parameter later
  takeSeat() {
    this.empty = false;
  }
  chageSeat() {
    this.empty = true;
  }

  takeSeat1() {
    this.empty1 = false;
  }
  chageSeat1() {
    this.empty1 = true;
  }
}
