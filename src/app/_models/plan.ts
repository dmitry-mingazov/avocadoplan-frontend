import { Day } from './day';
export class Plan {
    title: string;
    description: string;
    drinkDescription: string;
    owner: string;
    createdAt: Date;
    lastModifiedAt: Date;
    upvotes: number;
    downvotes: number;
    days: Day[];

}
