const withPlugins = require("next-compose-plugins");
const images = require("next-images");

module.exports = withPlugins([
  images,
  [
    {
      trailingSlash: true,
      basePath: "",
      env: {
        baseUrl: "",
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
]);
