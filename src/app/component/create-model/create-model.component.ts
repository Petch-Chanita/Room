import { Component, OnInit } from '@angular/core';
import * as $ from "@chenfengyuan/datepicker";
@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="datepicker"]').datepicker();
  }

}
