// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: [{ path: '~/components', pathPrefix: false }],
  css: [
    '@fontsource/jetbrains-mono/index.css',
    '@fontsource/barlow/900.css',
    '@fontsource/sora/600.css'
  ]
})
