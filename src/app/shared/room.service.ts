import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DataserviceService } from '../dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  host

  constructor(private http:HttpClient,private data:DataserviceService) {
    this.host = data.host

   }
   getroom(){
    return this.http.get<any[]>(this.host+'/rooms/getname/').pipe(
      map(rooms => {
        const newRoom =[]
        for(let room of rooms){
          // const email = room.email
          const uName = room.username
          newRoom.push({Room_number: uName})
        }
        return newRoom
      }),
      tap(Rooms => console.log(Rooms)
      )
    )
   }
   getRoomBySearch(nName: string){
    return this.http.get<any[]>(`${this.host+'/rooms/getname/'}${nName}`)
  }


}
