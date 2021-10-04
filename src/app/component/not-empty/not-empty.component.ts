import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-not-empty',
  templateUrl: './not-empty.component.html',
  styleUrls: ['./not-empty.component.css']
})
export class NotEmptyComponent implements OnInit {

  host;
  Room;
  T_room ;
  array=[];
  constructor(private http: HttpClient,private data: DataserviceService) {

    this.host = data.host;
    this.http.get(this.host+'/rooms/select').subscribe(
      (response:any)=>{
        console.log(response);
        this.Room = response;
        
        for(let a of response){
          if(a.status =="กำลังถูกใช้งาน"){
            this.array.push(a) 
            console.log(this.array);
          }
        }
      })
   }
   ngOnInit(): void {
    sessionStorage.notempty = "not-empty";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountnotempty) {
        sessionStorage.clickcountnotempty = Number(sessionStorage.clickcountnotempty) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountnotempty = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountnotempty;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountnotempty);
  }

}
