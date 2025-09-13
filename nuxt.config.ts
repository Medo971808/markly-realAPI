export default defineNuxtConfig({
  compatibilityDate: '2025-08-22',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/seo'],
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
      ]
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/main.css'
  ],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,

      firebaseApikey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectID: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppID: process.env.FIREBASE_APP_ID,
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
  }
})