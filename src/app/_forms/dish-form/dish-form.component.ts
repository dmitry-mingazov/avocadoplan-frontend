import { Component, OnInit, Input } from '@angular/core';
import { DishForm } from 'src/app/_models/dish-form';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent implements OnInit {
  @Input() dishForm: DishForm;
  @Input() index: number;

  constructor() { }

  ngOnInit() {}

}
