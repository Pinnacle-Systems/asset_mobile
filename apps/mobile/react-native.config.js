// react-native.config.js
// Links local font assets to Android and iOS at build time.
// Run `npx react-native-asset` after any font changes.
module.exports = {
    project: {
        android: {},
        ios: {},
    },
    assets: ['./src/assets/fonts/'],
};
