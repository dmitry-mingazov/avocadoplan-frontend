import { User } from './user.interface';
import { Day } from './day.interface';

export interface Plan {
    _id?: string;
    votes?: number[];
    title: string;
    description: string;
    drinkDescription: string;
    owner: string;
    // createdAt: Date;
    // lastModifiedAt: Date;
    tags: string[];
    // upvotes: number;
    // downvotes: number;
    days: Day[];

    upvoted?: boolean;
    downvoted?: boolean;
}
