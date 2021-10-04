import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  mineID
  username
  email
  img
  filename: string;
  base64: string | ArrayBuffer;
  host

  constructor(private http: HttpClient,private data:DataserviceService) {
   
    this.host = data.host
    this.mineID = sessionStorage.getItem("mineID")
    this.http.get(this.host+'/users/user/' + this.mineID)
      .subscribe((res: any) => {
        if (res) {
          this.username = res.username
          this.email = res.email
          this.img = res.Image
        }
      })
   }getFile(target: EventTarget) {

    let files = (target as HTMLInputElement).files;
    if (files != null) {
      let file = files[0]
      this.filename = file?.name
      console.log(this.filename)
      let reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event:any) => {
        this.img=event.target.result;
        this.base64 = reader.result
        let json = {
          base64: this.base64
        }
      }
      console.log('file ok');
    } else {
      console.log('No file');
    }
  }
  save() {
    let json = { email: this.email, username: this.username, Image:this.img };
    this.http.post(this.host+'/users/user/'+this.mineID, json)
      .subscribe((response: any) => {
        console.log(response);
        if (response) {
          if(response.success == false){
            Swal.fire("ไม่สามารถแก้ไขได้", "มีชื่อผู้ใช้ หรืออีเมล์นี้แล้ว กรุณากรอกข้อมูลใหม่อีกครั้ง", "warning");
          }else{ 
            Swal.fire({
              // position:'top-end',
              icon: 'success',
              title: 'บันทึกสำเร็จ',
              showConfirmButton: false,
              // buttons: false,
              timer: 2000
            });
            // window. location.reload();         
          }
        } else {
          console.log('Status : failed')
        }
      }, error => {
        console.log('Error! ',error);
      });

  }

  ngOnInit(): void {
    sessionStorage.profilesadmin = "profilesadmin";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountprofilesadmin) {
        sessionStorage.clickcountprofilesadmin = Number(sessionStorage.clickcountprofilesadmin) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountprofilesadmin = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountprofilesadmin;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountprofilesadmin);
  }

}
