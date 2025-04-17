import type { Profile } from "@entities/profile";
import type { Language } from "./language";

export async function getContent(lang: Language): Promise<Profile> {
    const data: Profile = await import(`../../profile/${lang}.json`);
    return data;
}