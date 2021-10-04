import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  mineID
  username
  img
  host
  Room
  status
  i_search


  constructor(private http:HttpClient,private router:Router,private data:DataserviceService) {
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
