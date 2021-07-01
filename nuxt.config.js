module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'user-manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'https://user-manager-c67d2-default-rtdb.firebaseio.com', // Used as fallback if no runtime config is provided
  },
  components: true,
  loading: { color: '#3B8070' },
  css: ['~/assets/css/style.css'],
  plugins: ['~/plugins/element-ui/element-ui.js','~/plugins/event-bus.js', '~/plugins/directive/directive.js', '~/plugins/filter/index.js'],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

