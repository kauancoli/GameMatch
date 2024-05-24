module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".js", ".json"],
          alias: {
            "@assets": "./assets",
            "@mocks": "./mocks",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@dtos": "./src/@dtos",
            "@hooks": "./src/hooks",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
