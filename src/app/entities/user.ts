import { Problem } from './problem';

export interface User {
    id: string;
    user: string;
    problem: Problem;
    scheduleDate: string;
}
