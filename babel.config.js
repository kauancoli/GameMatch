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
            "@mocks": "./mocks",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@dtos": "./src/@dtos",
          },
        },
      ],
    ],
  };
};