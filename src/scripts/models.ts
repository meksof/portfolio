export type ResponseBody = {
    id: string;
}
export type RequestBody = {
    referrer: string;
    utm_source: string | null;
    page: string;
    duration: number;
}