import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { DataserviceService } from 'src/app/dataservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-apphomeadmin',
  templateUrl: './apphomeadmin.component.html',
  styleUrls: ['./apphomeadmin.component.css']
})
export class ApphomeadminComponent implements OnInit {

  host
  Room_number
  
 

  constructor(private http:HttpClient,private data : DataserviceService) {
    this.host = data.host;
   }

  ngOnInit(): void {
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget)
      var recipient = button.data('whatever') 
      var modal = $(this)
      modal.find('.modal-title').text('New message to ' + recipient)
      modal.find('.modal-body input').val(recipient)
    })

    sessionStorage.Homeadmin = "Homeadmin";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountHomeadmin) {
        sessionStorage.clickcountHomeadmin = Number(sessionStorage.clickcountHomeadmin) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountHomeadmin = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountHomeadmin;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountHomeadmin);


  }
  create(){
    let json = {Room_number:this.Room_number,status: "กำลังอัพเดท",temperature:"",motion:"",luminance:"",people:""}

    // datetime: moment(new Date()).format('DD-MM-YYYY H:mm'),

    console.log(JSON.stringify(json));
    console.log(this.Room_number);
    

    this.http.post(this.host+'/rooms/createroom', json, { observe: 'response' })
      .subscribe((res: any) => {
        console.log(res);
        
        this.Room_number = res.Room_number;
        
        window. location.reload(); 
      })
  }
}
