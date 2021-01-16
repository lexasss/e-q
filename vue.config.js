module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath: process.env.NODE_ENV === 'production'
        ? '/e-q/'
        : '/',
    pwa: {
        themeColor: "#1976D2",
        msTileColor: "#1976D2",
        appleMobileWebAppCache: "yes",
        manifestOptions: {
            background_color: "#FFFFFF",
        },
    },
}