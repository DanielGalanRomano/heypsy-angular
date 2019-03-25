import { Person } from './person';

export interface Conversation {
    requester: Person;
    advisor: Person;
    requestDate: Date;
    adviceDate: Date;
    message: string;
}
