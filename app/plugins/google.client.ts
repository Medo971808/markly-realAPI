import { defineNuxtPlugin } from '#app'
import googleAuth from 'vue3-google-login'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(googleAuth, {
    clientId: "155337229134-uanii18lkoqo5717msrf09cd1ph3lgcp.apps.googleusercontent.com"
  })
})