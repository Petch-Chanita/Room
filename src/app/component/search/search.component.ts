import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  host
  mineID
  Room_number
  username
  img
  i_search
  res
  status
  datetime


  constructor(private http: HttpClient,private data:DataserviceService,
    private acRouter : ActivatedRoute,private router:Router) {
    this.host = data.host;
    this.mineID = sessionStorage.getItem("mineID");
    console.log(this.mineID);
    let ids = acRouter.snapshot.params['p1'];
    this.i_search = ids;
    console.log(this.i_search);
  }
  ngOnInit() {

    this.http.get(this.host+'/rooms/search/'+this.i_search)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.datetime = res[0].datetime
          this.Room_number = res[0].Room_number;
          this.status = res[0].status;
          console.log(this.Room_number+"---"+this.status);

        } else {
          console.log('error');
        }
      }, error => {
        console.log(error);

      })

  }
  search(){
    console.log(this.i_search);
    
    this.http.get(this.host+'/rooms/search/'+this.i_search).subscribe(
      res=>{
        console.log(res);
        if(res){     
          this.router.navigateByUrl('/search/' +this.i_search +'/');
        }
      },err=>{
        console.log(err);
        
      }
    )
  }

}
