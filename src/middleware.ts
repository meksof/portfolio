import { defineMiddleware } from 'astro/middleware';
import { availableLanguages } from '@utils/language.ts';
export const onRequest = defineMiddleware(async (context, next) => {
    // Only process the root path
    if (context.url.pathname === '/') {
        // Get the Accept-Language header
        const acceptLanguage = context.request.headers.get('accept-language') || '';

        // Parse the Accept-Language header
        const preferredLanguages = acceptLanguage.split(',')
            .map(lang => lang.split(';')[0].trim().split('-')[0])
            .filter((lang: string) => (availableLanguages as string[]).includes(lang));

        // Get the target language (first supported language or default to 'en')
        const targetLang = preferredLanguages.length > 0 ? preferredLanguages[0] : 'en';

        // Redirect to the language-specific path
        return context.redirect(`/${targetLang}`);
    }

    // Continue with the request for all other paths
    return next();
}); 