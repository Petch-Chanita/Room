import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {

  Room_number
  status
  host
  ids
  mineID
  i_search

  constructor(private http:HttpClient,private acRouter:ActivatedRoute,private data:DataserviceService,private router:Router) {
    this.mineID = sessionStorage.getItem("mineID");
    this.host = data.host;
    console.log(this.mineID);
    let ids = acRouter.snapshot.params['p1'];
    this.i_search = ids;
    console.log(this.i_search);
   }

  ngOnInit(): void {
    this.http.get(this.host+'/rooms/search/'+this.i_search).subscribe(
      (response:any)=>{
        console.log(response);
        this.Room_number = response[0].Room_number
        this.status = response[0].status
      })
      sessionStorage.search = "search";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountsearch) {
        sessionStorage.clickcountsearch = Number(sessionStorage.clickcountsearch) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountsearch = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountsearch;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountsearch);
  }
  search(){
    console.log(this.i_search);
    
    this.http.get(this.host+'/rooms/search/'+this.i_search).subscribe(
      res=>{
        console.log(res);
        if(res){     
          this.router.navigateByUrl('/search/' +this.i_search);
        }
      },err=>{
        console.log(err);
        
      }
    )
  }

}
