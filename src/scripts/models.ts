export type Visit = {
    id: string;
    sessionId: string;
}
export type VisitViewModel = {
    referrer: string;
    utmSource: string | null;
    page: string;
    createTimestamp: number;
    sessionId?: string;
}

export type VisitUpdateViewModel = {
    duration: number;
    updateTimestamp: number;
}

export type Event = {
    id: string;
}

export type EventViewModel = {
    visitId: string;
    type: string;
    value: string;
}

export enum Cookies {
    sessionId = 'sessionId',
    visitId = 'visitId'
}