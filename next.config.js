/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.externals = [...config.externals, "canvas"];
        config.module.rules.push({
            test: /\.node$/,
            loader: "node-loader",

        });
        return config;
    }
}

module.exports = nextConfig

