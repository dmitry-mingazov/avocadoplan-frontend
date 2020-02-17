import { FormArray, AbstractControl } from '@angular/forms';
import { Day } from '../_interfaces/day.interface';

export class WeekForm {
    days = new FormArray([]);
    indexMap = new Map<number, number>();
    weekDayIndex = 0;

    private dayIndex: number = 0;
    private deletedDays: Array<boolean> = new Array();


    constructor(
        public index: number,
        days?: Day[],
    ) {
    }

    getAbsoluteIndex(index): number {
        return this.indexMap.get(index);
    }

    addDay(control: AbstractControl, index: number) {
        this.days.push(control);
        this.indexMap.set(this.dayIndex++, index);
        this.deletedDays.push(false);
        this.weekDayIndex++;
    }

    public deleteDay(index: number) {
        this.deletedDays[index] = true;
        this.weekDayIndex--;
    }

    isDeleted(index: number) {
        return this.deletedDays[index];
    }

    isEmpty(): boolean {
        let empty = true;
        this.deletedDays.forEach( (deleted: boolean) => {
            if(!deleted)
                empty = false;
        })
        return empty;
    }


}
