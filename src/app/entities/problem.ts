import { Person } from './person';

export interface Problem {
    id: number;
    text: string;
    requester: Person;
    assisted: boolean;
    scheduleDate: Date;
    adviser?: Person;
}
