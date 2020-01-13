import { WeekDay } from '../enums/week-day.enum';
import { Meal } from './meal.interface';

export interface Day {
    weekDay: WeekDay;
    week: number;
    meals: Meal[];
}
