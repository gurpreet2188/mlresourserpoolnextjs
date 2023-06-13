import million from 'million/compiler'
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
export default million.next(nextConfig);
// module.exports = nextConfig

