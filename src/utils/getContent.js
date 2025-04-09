export async function getContent(lang) {
    const data = await import(`../../profile/${lang}.json`);
    return data.default;
}