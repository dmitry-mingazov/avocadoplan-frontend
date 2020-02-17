import { WeekDay } from '../_enums/week-day.enum';
import { Meal } from './meal.interface';

export interface Day {
    weekDay: string;
    week: number;
    meals: Meal[];
}
