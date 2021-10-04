import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apphome',
  templateUrl: './apphome.component.html',
  styleUrls: ['./apphome.component.css']
})
export class ApphomeComponent implements OnInit {

  constructor() {}
   

  ngOnInit(): void {
    sessionStorage.Apphome = "Apphome";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountApphome) {
        sessionStorage.clickcountApphome = Number(sessionStorage.clickcountApphome) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountApphome = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountApphome;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountApphome);
  }

}
