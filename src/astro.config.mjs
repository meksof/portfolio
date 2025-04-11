import { defineConfig } from "astro/config";

export default defineConfig({
    output: 'static',
    trailingSlash: 'ignore',
    redirects: {
        // Explicitly ignore favicon.ico
        '/favicon.ico': '/favicon.ico', // Forces Astro to treat it as static
    },
    experimental: {
        middleware: true
    }
});