export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Comedia Perpetua - Phi Beta Lambda',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Página no oficial sobre Comedia Perpetua AKA Phi Beta Lambda' },
      { name: 'msapplication-TileColor', content: '#91230D' },
      { name: 'msapplication-TileImage', content: '~/icons/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#91230D' },
      { name: 'apple-mobile-web-app-title', content: 'Comedia Perpetua - Phi Beta Lambda' },
      {
        property: 'og:title',
        content: 'Comedia Perpetua - Phi Beta Lambda',
        vmid: 'og:title'
      },
      {
        property: 'og:site_name',
        content: 'Comedia Perpetua - Phi Beta Lambda',
        vmid: 'og:site_name'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://yt3.ggpht.com/a/AGF-l79G11X7KAKflc4QSHemd4NddDGKeoocidle=s288-c-k-c0xffffffff-no-rj-mo',
        vmid: 'og:image'
      },
      {
        property: 'og:locale',
        content: 'es_ES',
        vmid: 'og:locale'
      },
      {
        property: 'og:description',
        content: 'Comedia Perpetua - Phi Beta Lambda | Página no oficial',
        vmid: 'og:description'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'manifest', href: '/icons/manifest.json' },
      { rel: 'preconnect', href: 'https://i.ytimg.com' },
      { rel: 'preconnect', href: 'https://yt3.ggpht.com/' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#91230D' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/infiniteScroll.js', ssr: false },
    { src: '~/plugins/echarts.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ['vue-echarts', 'resize-detector'],

    extend(config, ctx) {
    }
  }
}
