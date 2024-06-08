// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxtjs/supabase", '@pinia/nuxt', '@samk-dev/nuxt-vcalendar'],
  nitro: { prerender: { failOnError: false } },
  pinia: { storesDirs: ['./stores/**'] },
  supabase: { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_KEY }
})