// https://nuxt.com/docs/api/configuration/nuxt-config
import env from "./server/utils/env";

export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@nuxtjs/supabase"],
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  supabase: {
    url: env.SUPABASE_URL,
    key: env.SUPABASE_KEY,
    serviceKey: env.SERVICE_KEY,
    redirect: false,
  },
  ui: {
    icons: "all",
  },
  alias: {
    db: "/<rootDir>/db",
  },
  devtools: { enabled: true },
});
