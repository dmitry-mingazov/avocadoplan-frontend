import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PlanService } from 'src/app/services/plan.service';
import { PlanFormService } from 'src/app/services/plan-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // private createForm : FormGroup;
  private planForm: FormGroup;
  private planFormSub: Subscription;
  private days: FormArray;

  constructor(
    private alertController: AlertController,
    // private formBuilder: FormBuilder,
    // private planService: PlanService,
    private planFormService: PlanFormService) {
      /*
      this.createForm = this.formBuilder.group({
        plan_title: [''],
        plan_description: [''],
        drinks: [''],
        meal_type: [''],
        meal_title: [''],
        meal_description: [''],
      });
      */
  }

  ngOnInit() {
    this.planFormSub = this.planFormService.planForm$
      .subscribe( plan => {
        this.planForm = plan;
        this.days = this.planForm.get('days') as FormArray;
      })
    this.addDay();
  }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to confirm?',
      buttons: ['cancel', 'OK']
    });
    await alert.present();

  }

  createPlan(){}

  addDay(){
    this.planFormService.addDay();
  }

  deleteDay(index: number){
    this.planFormService.deleteDay(index);
  }

}
