const env = {
    ASTRO_PUBLIC_CALENDLY_URL: process.env.ASTRO_PUBLIC_CALENDLY_URL || import.meta.env.ASTRO_PUBLIC_CALENDLY_URL || '',
    SMT_SERVER: process.env.SMT_SERVER || import.meta.env.SMT_SERVER || ''
}
export function getEnvVar(key: keyof typeof env): string {
    return env[key];
}