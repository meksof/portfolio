const env = {
    ASTRO_PUBLIC_CALENDLY_URL: process.env.ASTRO_PUBLIC_CALENDLY_URL || import.meta.env.ASTRO_PUBLIC_CALENDLY_URL || '',
    UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID || import.meta.env.UMAMI_WEBSITE_ID || '',
    UMAMI_CLIENT_SCRIPT_URL: process.env.UMAMI_CLIENT_SCRIPT_URL || import.meta.env.UMAMI_CLIENT_SCRIPT_URL || '',
}
export function getEnvVar(key: keyof typeof env): string {
    return env[key];
}
