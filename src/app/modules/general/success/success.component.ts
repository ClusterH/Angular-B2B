import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  paid:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  paidTicket() {
    this.paid = true;
  }

  print(): void {    
    // let printContents = document.getElementById('print-section').innerHTML;
    // let myWindow=window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // myWindow.document.write("<p>This is 'myWindow'</p>");
    // myWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       <style>
    //       //........Customized style.......
    //       </style>
    //     </head>
    //     <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    
    // myWindow.document.close();
    // myWindow.focus();
    // myWindow.print();
    // //myWindow.close();
    var printContents = document.getElementById('print-section').innerHTML;
    var height = window.screen.height;
    var width = window.screen.width;
    var myWindow=window.open('','',`top=0,left=0,height=${height},width=${width}`);
    myWindow.document.write(
      `
      <html>
        <head></head>        
        <body>
          <table class="table ticket-table">
            <thead>
              <tr>
                <th scope="col">Passengers</th>
                <th scope="col">Ticket Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mikiyas Belayneh Maru</td>
                <td>121212121212212</td>
                <td><i class="fa fa-print"></i></td>
              </tr>
              <tr>
                <td>Mikiyas Belayneh Maru</td>
                <td>121212121212212</td>
                <td><i class="fa fa-print"></i></td>
              </tr>
            </tbody>
          </table>
        </body>        
      </html>
      `
    );
    // myWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>         
    //     </head>
    //     <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();

}
}
