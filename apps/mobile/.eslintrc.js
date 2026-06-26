module.exports = {
    root: true,
    extends: '@react-native-community',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        // Basic formatting rules that are safe
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'react-hooks/exhaustive-deps': 'warn',
        'eslint-comments/no-unlimited-disable': 'off',

        // We disable strict formatting checks so we don't break the build immediately
        'prettier/prettier': 'off',
        'react/prop-types': 'off',
        'react-native/no-inline-styles': 'warn',
    },
};
