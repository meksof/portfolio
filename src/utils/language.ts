export const LanguageEnum = {
    EN: 'en',
    FR: 'fr'
} as const;
export type Language = typeof LanguageEnum[keyof typeof LanguageEnum];

export const availableLanguages: Language[] = ['en', 'fr'];