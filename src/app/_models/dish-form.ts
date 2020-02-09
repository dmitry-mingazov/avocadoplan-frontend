import { FormControl } from '@angular/forms';
import { Dish } from '../_interfaces/dish.interface';

export class DishForm {
    name = new FormControl();
    description = new FormControl();

    constructor(dish: Dish) {
        if(dish == null || dish == undefined)
            return;
        
        this.name.setValue(dish.title);
        this.description.setValue(dish.description);
    }
}
