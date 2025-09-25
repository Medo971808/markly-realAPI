export default defineNuxtConfig({
  compatibilityDate: '2025-08-22',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/robots', '@pinia/nuxt', 'vuetify-nuxt-module', '@vee-validate/nuxt'],
  image: {
    domains: ['fakestoreapi.com'],
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
          
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' }
      ],
      meta: [
        { name: 'description', content: 'Markly is a platform that helps you manage your projects efficiently with modern tools and simple UI.' }
      ],
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: true,
          defer: true
        }
      ]
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/main.css'
  ],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },
  nitro: {
    preset: 'netlify-static'
  },
  vite: {
    build: {
      minify: "terser",
      terserOptions: {
        compress: true,
        mangle: true
      },
      target: "esnext"
    }
  },
  robots: {
    groups: [
      {
        userAgent: ['AdsBot-Google-Mobile', 'AdsBot-Google-Mobile-Apps'],
        disallow: ['/dashboard'],
        allow: ['/*'],
        comment: 'Allow Google AdsBot to index the login page but no-admin pages'
      }
    ]
  },
  
})