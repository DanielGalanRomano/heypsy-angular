export interface Problem {
    id: string;
    message: string;
    requester: string;
    assisted: boolean;
    scheduleDate: Date;
    resolved: boolean;
}
