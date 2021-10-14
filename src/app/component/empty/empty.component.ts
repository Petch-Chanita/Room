import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  host;
  Room;
  T_room ;
  array=[];

  constructor(private http: HttpClient,private data: DataserviceService) {

    this.host = data.host;
    this.http.get(this.host+'/rooms/search/status/ว่าง').subscribe(
      (response:any)=>{
        console.log(response);
        this.Room = response;
        
        for(let a of response){
          if(a.status =="ว่าง"){
            this.array.push(a) 
            console.log('array',this.array);
          }
        }
      })
   }

  ngOnInit(): void {
    sessionStorage.empty = "empty";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountempty) {
        sessionStorage.clickcountempty = Number(sessionStorage.clickcountempty) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountempty = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountempty;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountempty);
  }

}
