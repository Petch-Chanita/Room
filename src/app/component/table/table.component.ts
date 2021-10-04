import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  // mineID
  _id
  response
  Room_number
  temperature
  motion
  luminance
  people
  status
  host
  array
  constructor(private http: HttpClient,private data:DataserviceService) { 
    
    this.host = data.host
    // this.mineID = sessionStorage.getItem("mineID")
    this.http.get(this.host+'/rooms/select')
      .subscribe((res: any) => {
        if (res) {
          this.response = res
          console.log(this.response);
        }
      });
  }
  edit(id){
    this._id = id
    console.log(this._id);
    this.http.get(this.host+'/rooms/get/'+this._id)
      .subscribe((res: any) => {
          this.Room_number = res.Room_number
          this.status = res.status
          console.log(this.Room_number);
          console.log(this.status);
          
      }); 
    
  }
  update(){
    console.log(this._id);  
    let json = {Room_number: this.Room_number,status:this.status }
    this.http.post(this.host+'/rooms/update/'+this._id,json).subscribe(response =>{
      console.log(response);
      console.log(this.Room_number);
      console.log(this.status);

      location.reload();
      
    })

  }




  ngOnInit() {
    $(document).ready(function(){
      $("#tableSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    
    
  }
 

}
