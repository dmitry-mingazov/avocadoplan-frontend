import { MealType } from '../enums/meal-type.enum';
import { Dish } from './dish.interface';

export interface Meal {
    type: MealType;
    dishes: Dish[];
}
