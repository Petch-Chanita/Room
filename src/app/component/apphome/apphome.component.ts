import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DataserviceService } from 'src/app/dataservice.service';
import Swals from 'sweetalert2';

@Component({
  selector: 'app-apphome',
  templateUrl: './apphome.component.html',
  styleUrls: ['./apphome.component.css']
})
export class ApphomeComponent implements OnInit {


  host
  constructor(private http:HttpClient,private data: DataserviceService) {
    this.host = data.host
  }
   

  ngOnInit(): void {
    sessionStorage.Apphome = "Apphome";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountApphome) {
        sessionStorage.clickcountApphome = Number(sessionStorage.clickcountApphome) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountApphome = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountApphome;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountApphome);
  }

  refrsh() {
    console.log("refreshhhhhhhhhhhhhhhhhh");
    
  this.http.get(this.host+'/rooms/refresh').subscribe()
  setTimeout(() => {
    console.log("aaaaaa");
    window.location.reload();
  }, 7000); 
  Swals.fire({
    icon: 'warning',
    title: 'กำลังประมวลผล',
    didOpen: () =>{
      Swals.showLoading()

    },
    showConfirmButton: false,
    // timer: 1500
  }).then((result)=>{
    if(result.dismiss === Swals.DismissReason.timer){
      console.log('Timer');
      
    }
  });
  }

}
