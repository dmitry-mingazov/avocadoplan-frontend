export interface User {
    _id: string;
    votes: Map<string, number>;
    saved: string[];
}
