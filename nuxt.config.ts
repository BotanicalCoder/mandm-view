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
    public: {
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
    },
  },
  plugins: ["~/plugins/vue3-toastify.client.ts"],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
