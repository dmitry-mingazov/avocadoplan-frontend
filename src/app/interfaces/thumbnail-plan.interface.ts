import { User } from './user.interface';
import { Tag } from './tag.interface';

export interface ThumbnailPlan{
    _id: string;
    title: string;
    description: string;
    owner: User;
    createdAt: Date;
    tags: Tag[];
    upvotes: number;
    downvotes: number;
}
