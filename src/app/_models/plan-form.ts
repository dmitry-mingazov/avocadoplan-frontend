import { FormControl, FormArray } from '@angular/forms';
import { Plan } from '../_interfaces/plan.interface';

export class PlanForm {
    title = new FormControl();
    description = new FormControl();
    drinkDescription = new FormControl();
    owner = new FormControl();
    tags = new FormArray([]);
    days = new FormArray([]);

    constructor(plan?: Plan){
        if(plan == null || plan == undefined)
            return;
        this.title.setValue(plan.title);
        this.description.setValue(plan.descritpion);
        this.drinkDescription.setValue(plan.drinkDescription);
        if(plan.owner != null || plan.owner != undefined)
            this.drinkDescription.setValue(plan.drinkDescription);
        // TODO handle tags and days
    }
}
