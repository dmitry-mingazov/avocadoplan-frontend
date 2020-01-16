import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { DayFormService } from 'src/app/services/day-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-day-form',
  templateUrl: './day-form.component.html',
  styleUrls: ['./day-form.component.scss'],
})
export class DayFormComponent implements OnInit {
  @Input() dayForm: FormGroup;
  @Input() index: number;

  private dayFormSub: Subscription;
  private meals: FormArray;


  constructor(
    private dayFormService: DayFormService 
  ) { }

  ngOnInit() {
    this.dayFormService.updateDay(this.dayForm);
    this.dayFormSub = this.dayFormService.dayForm$
      .subscribe( day => {
        this.dayForm = day;
        this.meals = this.dayForm.get('meals') as FormArray;
      })
    
  }

  addMeal() {
    this.dayFormService.addEmptyMeal();
  }



}
