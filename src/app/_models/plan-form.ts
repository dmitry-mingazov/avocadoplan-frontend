import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Plan } from '../_interfaces/plan.interface';
import { DayForm } from './day-form';

const fb = new FormBuilder();

export class PlanForm {
    _id = null;
    title = new FormControl();
    description = new FormControl();
    drinkDescription = new FormControl();
    owner = null;
    tags = new FormArray([]);
    days = new FormArray([]);

    constructor(plan?: Plan){
        if(plan == null || plan == undefined)
            return;
        if(plan._id != null || plan._id != undefined)
            this._id = plan._id;
        this.title.setValue(plan.title);
        this.description.setValue(plan.description);
        this.drinkDescription.setValue(plan.drinkDescription);
        if(plan.owner != null || plan.owner != undefined)
            this.owner = plan.owner;
        // TODO handle tags and days
        // if(plan.tags != null || plan.tags != undefined)
            // plan.tags.forEach( tag => {
                // this.tags.push(fb.group(tag));
            // })
        if(plan.days != null || plan.days != undefined)
            plan.days.forEach( day => {
                this.days.push(fb.group(new DayForm(day)));
            })
    }

}
