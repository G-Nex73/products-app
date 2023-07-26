// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxthq/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxtjs/supabase",
  ],
  ui: {
    icons: "all",
  },
  devtools: { enabled: true },
});
