// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: { baseURL: process.env.APP_ENV === "production" ? "/neon-anime/" : undefined },
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@pinia/nuxt", "@samk-dev/nuxt-vcalendar"],
  pinia: { storesDirs: ["./stores/**"] },
  supabase: { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_KEY },
});
