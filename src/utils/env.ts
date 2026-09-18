const env = {
    ASTRO_PUBLIC_CALENDLY_URL: process.env.ASTRO_PUBLIC_CALENDLY_URL || import.meta.env.ASTRO_PUBLIC_CALENDLY_URL || '',
    UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID || import.meta.env.UMAMI_WEBSITE_ID || 'd67a86ba-fe71-41b6-8b35-6046e5d437eb'
}
export function getEnvVar(key: keyof typeof env): string {
    return env[key];
}
