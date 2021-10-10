import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit {


  status
  host
  Room_number
  label
  i_date;
  time
  response

  constructor(private http:HttpClient,private data:DataserviceService) { 
    this.host = data.host
  }

  ngOnInit() {
    
  }
  submit(){
    let json = {Room_number:this.Room_number,date:(this.i_date = moment().format('DD-MM-YYYY')),time:this.time,label:this.label};
    console.log(JSON.stringify(json));
    
    console.log(this.Room_number);
    console.log(this.i_date);
    console.log(this.time);
    console.log(this.label);
  

    // console.log(JSON.stringify(json));
    
    this.http.post(this.host+'/admin/create',json, { observe: 'response' }).subscribe(
     ( res:any) => {
        console.log(res);
      
      },err => {
        console.log(err);
        
      })
  }
 

}
