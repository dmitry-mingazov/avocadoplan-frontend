import { User } from './user.interface';
import { Day } from './day.interface';

export interface Plan {
    _id?: string,
    title: string;
    descritpion: string;
    drinkDescription: string;
    owner: User;
    // createdAt: Date;
    // lastModifiedAt: Date;
    tags: string[];
    // upvotes: number;
    // downvotes: number;
    days: Day[];
}
