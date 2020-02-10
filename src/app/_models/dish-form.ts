import { FormControl } from '@angular/forms';
import { Dish } from '../_interfaces/dish.interface';

export class DishForm {
    title = new FormControl();
    description = new FormControl();

    constructor(dish: Dish) {
        if(dish == null || dish == undefined)
            return;
        
        this.title.setValue(dish.title);
        this.description.setValue(dish.description);
    }
}
