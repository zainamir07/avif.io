/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withPlugins = require("next-compose-plugins");
const images = require("next-images");

const baseUrl = "";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(
  [
    images,
    [
      {
        trailingSlash: true,
        basePath: baseUrl,
        env: {
          baseUrl: baseUrl,
        },
        webpack: (config, { dev, isServer }) => {
          config.module.rules.push({
            test: /\.svg$/,
            use: [
              {
                loader: "url-loader",
              },
            ],
          });
          return config;
        },
      },
    ],
  ],
  nextConfig
);
