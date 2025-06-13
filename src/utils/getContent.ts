import type { Profile } from "@entities/profile";
import type { Language } from "./language";

// Cache for storing loaded profile data by language
const profileCache: Record<Language, Profile | null> = {
    en: null,
    fr: null
};

export async function getContent(lang: Language): Promise<Profile> {
    if (profileCache[lang]) {
        return profileCache[lang];
    }

    const data: Profile = await import(`../../profile/${lang}.json`);
    profileCache[lang] = data;
    return data;
}