import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {

  mineID
  host
  i_search

  constructor(private data: DataserviceService,private http:HttpClient,private router:Router) { 
    this.host = data.host;
    this.mineID = sessionStorage.getItem("mineID");
    console.log(this.mineID);
  }

  ngOnInit(): void {
  }
  search(){
    console.log(this.i_search);
    
    this.http.get(this.host+'/rooms/search/'+this.i_search).subscribe(
      res=>{
        console.log(res);
        if(res){
         this.router.navigateByUrl('/search/'+this.i_search);
        }
        
        
      },err=>{
        console.log(err);
        
      }
    )

  }

}
