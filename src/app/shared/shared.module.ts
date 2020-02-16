import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlanFormComponent } from "../components/plan-form/plan-form.component";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { EnumToArrayPipe } from "../_pipes/enum-to-array.pipe";
import { PlanCardComponent } from "../components/plan-card/plan-card.component";
import { ModalDayPage } from '../_modals/modal-day/modal-day.page';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [
    PlanFormComponent,
    PlanCardComponent,
    EnumToArrayPipe,
    ModalDayPage
  ],
  exports: [
    PlanFormComponent,
    PlanCardComponent,
    EnumToArrayPipe,
    ModalDayPage
  ]
})
export class SharedModule {}
