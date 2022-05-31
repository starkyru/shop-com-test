module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', { loose: false }],
    // ['@babel/preset-env', { targets: { node: 'current' } }],
    // '@babel/preset-react',
    // '@babel/preset-typescript',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
  ],
};
