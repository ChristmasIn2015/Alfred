module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        ['@babel/plugin-transform-runtime'],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        ['@babel/plugin-proposal-private-methods'],
    ],
}
