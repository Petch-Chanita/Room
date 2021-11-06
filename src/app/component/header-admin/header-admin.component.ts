import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  host;
  mineID;
  username;
  img;
  constructor(private data: DataserviceService,private http : HttpClient) {
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
