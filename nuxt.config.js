export default {//esta configurado por defecto en modo: 'Universal', q es que quieres un proyecto dinamico y no estatico
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {//se agrega a cada pagina del proyecto
    title: 'MW Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cool Web Development Blog' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Redressed&display=swap"}
    ]
  },

  loading:{//la barra de carga q aparce en la parte superior del navegador cuando esta cargando
    color: '#fa923f',
    height: '4px',
    duration: 5000
  },//para paginas estaticas - no es necesario ahora pq estamos en Universal
  loadingIndicator:{
    name: 'circle',
    color: '#fa923f'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/core-components.js',//en el siguiente archivo se guardan todos los import de las vistas y componentes de manera global
    '~plugins/date-filter.js'//aqui tmb se pueden compartir funciones js q se pueden llamar en todos lados
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  axios:{
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-d3290-default-rtdb.firebaseio.com',
    credentials: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env:{//crea una ruta q se puede acceder en cualquier parte del proyecto
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-d3290-default-rtdb.firebaseio.com'
  },
  transition:{
    name: 'fade',//mismo nombre q en los estilos del assets/styles/main.css
    mode: 'out-in'
  }
}
