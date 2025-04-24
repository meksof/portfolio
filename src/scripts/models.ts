export type Visit = {
    id: string;
}
export type VisitViewModel = {
    referrer: string;
    utm_source: string | null;
    page: string;
    duration: number;
}

export type Event = {
    id: string;
}

export type EventViewModel = {
    type: string;
    value: string;
}