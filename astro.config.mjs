import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
// https://astro.build/config
export default defineConfig({
    adapter: netlify(),
    output: 'static',
    trailingSlash: 'ignore',
    redirects: {
        // Explicitly ignore favicon.ico
        '/favicon.ico': '/favicon.ico', // Forces Astro to treat it as static,
        '/images/': '/images/'
    },
    image: {
        // Configure image optimization options
        service: {
            entrypoint: 'astro/assets/services/sharp'
        },
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*'
            }
        ]
    }
});