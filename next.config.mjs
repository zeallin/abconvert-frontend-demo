/** @type {import('next').NextConfig} */

// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    experimental: { instrumentationHook: true },
    webpack(config) {
        config.resolve.alias['@/'] = `${__dirname}/src`;
        config.resolve.alias['@/components'] = `${__dirname}/src/components`;
        config.resolve.alias['@/lib'] = `${__dirname}/src/lib`;
        config.resolve.alias['@/hooks'] = `${__dirname}/src/hooks`;
        config.resolve.alias['@/context'] = `${__dirname}/src/context`;
        config.resolve.alias['@/types'] = `${__dirname}/src/types`;

        return config;
    },
};

export default nextConfig;
