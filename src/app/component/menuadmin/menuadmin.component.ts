import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  
  mineID
  username
  img
  host


  constructor(private http:HttpClient,private data:DataserviceService) {
    this.host = data.host 
    this.mineID = sessionStorage.getItem("mineID")
    this.http.get(this.host+'/users/user/'+this.mineID)
      .subscribe((res: any)=>{
        // console.log(res)
        if(res){
            this.username = res.username
            this.img = res.Image
            console.log(this.username)
        }
       

      })
  }

  ngOnInit(): void {
  }

}
