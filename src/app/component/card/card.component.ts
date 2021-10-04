import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  host;
  mineID;
  R_status;
  people;
  Room;
  i_search;

  constructor(private http: HttpClient,private data: DataserviceService,private acRouter : ActivatedRoute,private router:Router) {
    this.host = data.host;
    this.mineID = sessionStorage.getItem("mineID");
    console.log(this.mineID);

    this.http.get(this.host+'/rooms/select').subscribe(
      (response: any) =>{
        console.log(response);
        this.Room = response;
      })

   }
  //  search(i_search){
  //    this.i_search = i_search
  //    console.log(i_search);
     
  //    this.http.get(this.host+'/rooms/search/'+this.i_search).subscribe(
  //      res=>{
  //        console.log(res);
  //        this.Room = res[0]._id
  //        console.log(this.Room);
         
  //        if(i_search != null){
  //         this.router.navigateByUrl('/search/'+this.Room)
  //        }
         
  //      }
  //    )

  //  }

  

  ngOnInit(): void {
  }

}
