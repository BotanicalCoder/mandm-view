// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/styles.css", "vue3-toastify/dist/index.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: false },
  modules: ["nuxt-icon", "@pinia/nuxt"],
  runtimeConfig: {
    privateKey: process.env.NUXT_SECRET_KEY,
    public: {
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
      // privateKey: process.env.NUXT_SECRET_KEY,
      PRIVATE_KEY: process.env.NUXT_PRIVATE_KEY,
      TEST_PRIVATE_KEY: process.env.NUXT_TEST_PRIVATE_KEY,
      TEST_PUBLIC_KEY: process.env.NUXT_TEST_PUBLIC_KEY,
    },
  },
  plugins: ["~/plugins/vue3-toastify.client.ts"],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
