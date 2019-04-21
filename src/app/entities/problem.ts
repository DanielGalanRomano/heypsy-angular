
export interface Problem {
    id: string;
    message: string;
    requester: string;
    scheduleDate: string;
    expirationDate: string;
    answers: number;
    tokenNotification: string;
    expirationDinamyDate?: string;
}
