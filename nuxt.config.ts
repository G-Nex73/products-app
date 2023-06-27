// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxthq/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-icons",
    "@nuxt/content",
    "@vite-pwa/nuxt",
  ],
  ui: {
    icons: "all",
  },
  pwa: {
    manifest: {
      name: "RNG",
      short_name: "RNG",
      description: "RNG",
      theme_color: "#121722",
      background_color: "#121722",
      icons: [
        {
          src: "/assets/pwa-assets/icons/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/assets/pwa-assets/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/assets/pwa-assets/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/assets/pwa-assets/icons/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/assets/pwa-assets/icons/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/assets/pwa-assets/icons/apple-touch-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      cleanupOutdatedCaches: true,
      globPatterns: ["**/*.{js,css,html,png,svg}"],
    },
    injectRegister: "inline",
    registerType: "autoUpdate",
    devOptions: { enabled: true },
  },
  devtools: { enabled: true },
});
