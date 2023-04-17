module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', 
  ],
  plugins: [
    ["module:react-native-dotenv", {
      moduleName: "react-native-dotenv",
      allowUndefined: false,
      path: "./src/config/.env"
    }],
    'react-native-reanimated/plugin',
  ]
};
