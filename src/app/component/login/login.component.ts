import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import  swals  from 'sweetalert2'
import { DataserviceService } from 'src/app/dataservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  i_username
  i_password: any;
  value
  id
  pass
  closeResult: string;
  hide = true;
  mineID
  url = "./assets/dist/img/138-1388270_transparent-user-png-icon.png"
  host
  
  

  constructor(
    private http: HttpClient, private router: Router, private modalService: NgbModal,private data: DataserviceService
    ){
      this.host = data.host
      console.log(this.host)
    }
  login() {

    let json = { username: this.i_username, password: this.i_password };
    this.http.post(this.host+'/authen/login', json, { observe: 'response' })
      .subscribe((response: any) => {
        console.log(response)
        if (response) {
          console.log(response.body)
          this.value = response.body.data
          this.mineID = response.body._id
          sessionStorage.setItem('token', this.value);
          sessionStorage.getItem('token')
          sessionStorage.setItem('mineID', this.mineID);
          console.log(response.status)

          const Toast = swals.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', swals.stopTimer)
              toast.addEventListener('mouseleave', swals.resumeTimer)
            }
          });

          if (response.status == 200 ) {
            if(this.mineID != "6114e9898a2df33b20df2008"){
              console.log('Welcome')
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              });
              this.router.navigateByUrl('/home');
            }
            else if(this.mineID == "6114e9898a2df33b20df2008"){
              console.log('Welcome')
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              });
              this.router.navigateByUrl('/appadmin');
            }
          } 
          else {
            swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
            console.log('Error')
          }
        } else {
          swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
          console.log('Login fail')
        }
      }, error => {
        swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
        console.log('Error!', error)
      })

    sessionStorage.login = "Login";
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.clickcountLogin) {
        sessionStorage.clickcountLogin = Number(sessionStorage.clickcountLogin) + 1;
        console.log("Creating a success session...");
      }
      else {
        sessionStorage.clickcountLogin = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result") + sessionStorage.clickcountLogin;
    }
    else {
      sessionStorage.getItem("result");
    }
    console.log('session count : ' + sessionStorage.clickcountLogin);
  }
  msu() {
    let json = { id: this.id, password: this.pass }

    this.http.post('http://202.28.34.197/csapis/authentication/reg', json)
      .subscribe((response: any) => {
        console.log(response);
        if (response) {
          let json = { email: this.id+"@msu.ac.th", password: this.pass, username: this.id, Image: this.url };
          this.http.post(this.host+'/authen/register/msu', json)
            .subscribe((response: any) => {
              console.log(response);
              this.http.get(this.host+'/users/username/' + this.id).subscribe((response: any) => {
                console.log(response);
                this.mineID = response[0]._id
                console.log(this.mineID);
                sessionStorage.setItem('token', this.value);
                sessionStorage.getItem('token')
                sessionStorage.setItem('mineID', this.mineID);
                swals.fire("เข้าสู่ระบบสำเร็จ","ยินดีต้อนรับสู่ระบบตรวจสอบการเข้าใช้ห้องเรียนแบบเรียลไทม์","success");
                this.router.navigateByUrl('/home')

              })
            }, error => {
              console.log('Error', error);

            })
        } else {
          console.log('No response');

        }
      }, error => {
        swals.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบความถูกต้องอีกครั้ง :)", "error");
        console.log('Error', error);

      })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    
  }
}
