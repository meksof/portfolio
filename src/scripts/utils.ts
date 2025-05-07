/**
 * Get a cookie value by name
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie begins with the name we want
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

/**
 * Set a cookie
 * @param name The name of the cookie
 * @param value The value to store
 * @param maxAge Max age in seconds (default: 2 hours)
 * @param path Cookie path (default: '/')
 */
export function setCookie(name: string, value: string, maxAge: number = 7200, path: string = '/'): void {
    document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}`;
}
