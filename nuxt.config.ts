// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";
import env from "./server/utils/env";

export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@nuxtjs/supabase", "@pinia/nuxt"],
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {},
      },
    },
  },
  alias: {
    env: fileURLToPath(new URL("./server/utils/env", import.meta.url)),
    db: fileURLToPath(new URL("./db", import.meta.url)),
    "db/*": fileURLToPath(new URL("./db/*", import.meta.url)),
    store: fileURLToPath(new URL("./store", import.meta.url)),
    "store/*": fileURLToPath(new URL("./store/*", import.meta.url)),
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
  typescript: {
    tsConfig: {
      compilerOptions: {},
    },
  },
  devtools: { enabled: true },
});
