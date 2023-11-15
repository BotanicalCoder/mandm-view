// import axiosinstance from "../libs/axiosinstance";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      fetchToken: () => window.Android.getMyVariable(),
      getToken: () => {
        return window.token;
      },
    },
  };
});
