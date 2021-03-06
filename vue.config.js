const fs = require( 'fs' );
const webpack = require( 'webpack' );

const packageJson = fs.readFileSync( './package.json' );
const version = JSON.parse( packageJson ).version || 0;

module.exports = {
    productionSourceMap: false,

    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"',
                },
            }),
        ],
    },    

    transpileDependencies: [
        'vuetify',
    ],

    publicPath: process.env.NODE_ENV === 'production'
        ? '/e-q/'
        : '/',

    pwa: {
        assetsVersion: version,
        themeColor: '#1976D2',
        msTileColor: '#A9310F',
        appleMobileWebAppCache: 'yes',
        manifestOptions: {
            name: 'Electronic offline questionnaire',
            background_color: '#FFFFFF',
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png',
        },
    },
}