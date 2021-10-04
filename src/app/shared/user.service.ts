import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DataserviceService } from '../dataservice.service';

@Injectable({
  providedIn: 'root'
 

})
export class UserService {

  host
 

  constructor(private http: HttpClient,private data:DataserviceService) {
    this.host = data.host
   }

  getUsers(){
    return this.http.get<any[]>(this.host+'/users/useremail/').pipe(
      map(users => {
        const newUsers =[]
        for(let user of users){
          const email = user.email
          const uName = user.username
          newUsers.push({email: email,username: uName})
        }
        return newUsers
      }),
      tap(users => console.log(users)
      )
    )
  }

  getUserByEmail(email: string){
    return this.http.get<any[]>(`${this.host+'/users/username/'}${email}`)
  }

  getUreserByUsername(uName: string){
    return this.http.get<any[]>(`${this.host+'/users/username/'}${uName}`)
  }
}
 