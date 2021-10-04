import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import  swals  from 'sweetalert2'
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  i_email: any;
  i_username: any;
  i_password: any;
  image: any;
  urls = "./assets/dist/img/138-1388270_transparent-user-png-icon.png"
  host;


  constructor(private router: Router, private http: HttpClient,private data:DataserviceService) {
    this.host = data.host


  }

  submit() {
    let json = { email: this.i_email, password: this.i_password, username: this.i_username, Image: this.urls };
    console.log(JSON.stringify(json));
    this.http.post(this.host+'/authen/register', json,{ observe: 'response' })
      .subscribe((response: any) => {
          
        if (response) {
          console.log(response);
          console.log(response.status);
          if(response.status == 200){
            console.log('status: OK');
            swals.fire("บันทึกสำเร็จ", "สามารถเข้าสู่ระบบด้วยการกรอกชื่อผู้ใช้ และรหัสผ่าน", "success");
            this.router.navigateByUrl('/login');
          }else{
            swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
            console.log('not register');
            
          }
        } else {
          swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
          console.log('Status : failed')

        }
      }, error => {
        swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
        console.log('Error! ',error);
      });

  }
  // getFile(target: EventTarget) {


  //   let files = (target as HTMLInputElement).files;
  //   if (files != null) {
  //     // console.log(files[0].name)
  //     let file = files[0]
  //     this.filename = file?.name
  //     console.log(this.filename)
  //     let reader = new FileReader()
  //     reader.readAsDataURL(files[0])
  //     reader.onload = (event: any) => {
  //       this.urls = event.target.result;
  //       this.base64 = reader.result
  //       let json = {
  //         base64: this.base64
  //       }
  //     }
  //     console.log('file ok');
  //   } else {
  //     console.log('No file');
  //   }
  // }
  ngOnInit() {
    // this.createFrom()
  }
  // createFrom(){
  //   this.registerForm = this.fb.group({
  //     email: ['',
  //      Validators.required, 
  //       uniqueEmailValidator(this.userservice)],
  //     username: ['',
  //     null, 
  //     UniqueUsernameValidator(this.userservice)],
  //   },
  //   );
    
  // }
  // get username(){
  //   return this.registerForm.get('username')
  // }
  // get email(){
  //   return this.registerForm.get('email')
  // }





}
