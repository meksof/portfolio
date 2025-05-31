export type Visit = {
    id: string;
    sessionId: string;
}
export type VisitViewModel = {
    referrer: string;
    utm_source: string | null;
    page: string;
    duration: number;
    sessionId?: string;
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