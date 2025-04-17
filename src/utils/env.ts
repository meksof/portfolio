const env = {
    ASTRO_PUBLIC_CALENDLY_URL: process.env.ASTRO_PUBLIC_CALENDLY_URL || import.meta.env.ASTRO_PUBLIC_CALENDLY_URL || '',
    ACKEE_SERVER_URL: process.env.ACKEE_SERVER_URL || import.meta.env.ACKEE_SERVER_URL || '',
    ACKEE_TRACKER_URL: process.env.ACKEE_TRACKER_URL || import.meta.env.ACKEE_TRACKER_URL || '',
    ACKEE_DOMAIN_ID: process.env.ACKEE_DOMAIN_ID || import.meta.env.ACKEE_DOMAIN_ID || '',
    ACKEE_OPTS: process.env.ACKEE_OPTS || import.meta.env.ACKEE_OPTS || ''
}
export function getEnvVar(key: keyof typeof env): string {
    return env[key];
}
