import { Directive } from '@angular/core';
import { AsyncValidator, ValidationErrors,AbstractControl,NG_ASYNC_VALIDATORS, AsyncValidatorFn, NG_VALIDATORS, Validator } from '@angular/forms';
import { RoomService } from './room.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export function RoomValidator(RoomService: RoomService): AsyncValidatorFn{
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
    return RoomService.getRoomBySearch(c.value).pipe(
      map(Rooms =>{
        return Rooms && Rooms.length > 0 ?{'RoomValidate' : true}: null
      })
    )
  }
}


@Directive({
  selector: '[RoomValidate]',
  providers: [{provide: NG_ASYNC_VALIDATORS,useExisting: RoomValidatorDirective,multi: true}]
})
export class RoomValidatorDirective implements AsyncValidator {


  constructor(private RoomsService: RoomService) { }
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.RoomsService.getRoomBySearch(c.value).pipe(
      map(Rooms => {
        console.log(Rooms.length);
        
        return Rooms && Rooms.length >0 ? {'RoomValidate' :true}: null
      })
    )
   }

}
