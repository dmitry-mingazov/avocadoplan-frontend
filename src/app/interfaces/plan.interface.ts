import { User } from './user.interface';
import { Tag } from './tag.interface';
import { Day } from './day.interface';

export interface Plan {
    title: string;
    descritpion: string;
    drinkDescription: string;
    owner: User;
    createdAt: Date;
    lastModifiedAt: Date;
    tags: Tag[];
    upvotes: number;
    downvotes: number;
    days: Day[];
}
