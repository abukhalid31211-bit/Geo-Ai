module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@store': './src/store',
            '@theme': './src/theme',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@apptypes': './src/types',
            '@constants': './src/constants',
            '@assets': './src/assets',
            '@navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};
