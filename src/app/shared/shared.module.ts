import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlanFormComponent } from "../components/plan-form/plan-form.component";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { EnumToArrayPipe } from "../_pipes/enum-to-array.pipe";
import { PlanCardComponent } from "../components/plan-card/plan-card.component";
import { ModalDayPage } from '../_modals/modal-day/modal-day.page';
import { PlanCardListComponent } from "../components/plan-card-list/plan-card-list.component";

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [
    PlanFormComponent,
    PlanCardComponent,
    EnumToArrayPipe,
    ModalDayPage,
    PlanCardListComponent,
    EnumToArrayPipe
  ],
  exports: [
    PlanFormComponent,
    PlanCardComponent,
    EnumToArrayPipe,
    ModalDayPage,
    PlanCardListComponent,
    EnumToArrayPipe
  ]
})
export class SharedModule {}
