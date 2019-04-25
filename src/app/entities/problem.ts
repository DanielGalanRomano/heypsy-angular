
export interface Problem {
    id: string;
    idRequester: string;
    message: string;
    requester: string;
    scheduleDate: string;
    expirationDate: string;
    answers: number;
    tokenNotification: string;
    expirationDinamyDate?: string;
    expirationValue?: number;
    assistedByArr: string[];
}
