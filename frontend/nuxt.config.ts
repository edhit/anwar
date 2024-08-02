// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-file-storage'
  ],
  // app: {
  //   head: {
  //     link: [
  //       { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css' }
  //     ],
  //     script: [
  //       { src: 'https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js' }
  //     ]
  //   },
  // },
  telemetry: false,
  ssr: false
})